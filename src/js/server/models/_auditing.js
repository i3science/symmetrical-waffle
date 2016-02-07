var context = require('request-context'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema;

module.exports = exports = function auditingPlugin(schema, options) {
    schema.add({
        created: {
            type: Date,
            default: Date.now
        },
        created_by: {
            type: String,
            ref: 'User'
        },
        updated: {
            type: Date,
            default: Date.now
        },
        updated_by: {
            type: String,
            ref: 'User'
        }
    });

    schema.pre('save', function(next){
        if (this.isNew) {
            this.created = new Date();
            this.created_by = context.get('request:loggedInUser');
        }
        this.updated = new Date();
        this.updated_by = context.get('request:loggedInUser');
        next();
    });
}