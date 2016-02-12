var context = require('request-context'),
    deep_diff = require('deep-diff'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema;

module.exports = exports = function auditingPlugin(schema) {

    function action(before, after) {
        if (!before && after) {
            return 'created';
        }
        if (before && after) {
            return 'updated';
        }
        if (before && !after) {
            return 'deleted';
        }
        return 'invalid';
    }
    function action_delta(diff) {
        switch (diff.kind) {
            case 'N':
                return 'created';
            case 'E':
                return 'updated';
            case 'D':
                return 'deleted';
        }
    }

    schema.add({
        created: {
            type: Date,
            default: Date.now
        },
        created_by: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        updated: {
            type: Date,
            default: Date.now
        },
        updated_by: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    });

    schema.pre('validate', function(next){
        if (this.isNew) {
            this.created = new Date();
            this.created_by = context.get('request:currentUser');
        } else {
            this.constructor.findOne({ _id: this._id }, function(err, doc){
                this._original = doc;
            }.bind(this));
        }
        this.organization = context.get('request:currentOrganization');
        this.updated = new Date();
        this.updated_by = context.get('request:currentUser');
        next();
    });

    schema.post('init', function(){
        this._original = this;
    });

    schema.post('save', function(doc, next){
        var ignoreList = ['__v','__id'];

        var before = this._original;
        if (before instanceof mongoose.Model) {
            before = before.toObject();
        }
        this._original = undefined;
        var after = doc;
        if (after instanceof mongoose.Model) {
            after = after.toObject();
        }
        var diff = deep_diff.diff(before, after) || [];

        var History = mongoose.model('History');
        var history = new History;
        history.created_by = context.get('request:currentUser');
        history.action = action(before, after);
        history.summary = action(before, after);
        history.target = this.name || this.text || this._id || 'invalid';
        history.eventable = {
            id: this._id,
            type: this.constructor.modelName
        };
        history.changes = [];

        diff.forEach(function(delta){
            if (delta.path) {
                var path = delta.path.toString().replace(/\,/g,'.');
                if (ignoreList.indexOf(path) !== -1) {
                    return;
                }
                var change = {
                    field: path,
                    action: action_delta(delta),
                    before: delta.lhs,
                    after: delta.rhs
                };
                if (delta.lhs) {
                    change.before = delta.lhs;
                }
                if (delta.rhs) {
                    change.after = delta.rhs;
                }
                history.changes.push(change);
            } else {
                Object.keys(delta.rhs).forEach(function(field){
                    if (ignoreList.indexOf(field) !== -1) {
                        return;
                    }
                    history.changes.push({
                        field: field,
                        action: 'created',
                        after: delta.rhs[field]
                    });
                });
            }
        });

        history.save(function(){
            next();
        });
    });
};