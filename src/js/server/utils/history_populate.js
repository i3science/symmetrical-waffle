var Q = require('q');

module.exports = function(mongoose) {
    if (mongoose.Query.prototype.populateHistoryTarget != null) {
        return;
    }

    var Query = mongoose.Query,
        _exec = Query.prototype.exec;

    Query.prototype.populateHistoryTarget = function() {
        if (this._populateHistoryTarget) {
            return this;
        }
        this._populateHistoryTarget = true;
        return this;
    };

    Query.prototype.exec = function(op, cb) {
        if (!this._populateHistoryTarget) {
            return _exec.call(this, op, cb);
        }

        if (typeof op === 'function') {
            cb = op;
            op = null;
        } else {
            cb = cb || function(){};
        }

        var resolver = function(resolve, reject) {
            _exec.call(this, op, function(err, docs){
                if (err) {
                    return cb(err), reject(err);
                }
                if (!docs) {
                    return cb(null, docs), resolve(docs);
                }
                var waiting = docs.map(function(doc){
                    var model = mongoose.model(doc.eventable.type);
                    return model
                        .findOne({ _id: doc.eventable.id })
                        .exec();
                });
                Q
                    .all(waiting)
                    .then(function(targets){
                        return docs.map(function(doc, i){
                            doc.eventable.target = targets[i];
                            return doc;
                        });
                    })
                    .then(function(docs){
                        return cb(null, docs), resolve(docs);
                    })
                    .fail(function(err){
                        return cb(err), reject(err);
                    });
            });
        }.bind(this);  

        return Q.Promise(resolver);
    };
};