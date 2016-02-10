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
    }

    Query.prototype.exec = function(op, cb) {
        if (!this._populateHistoryTarget) {
            return _exec.call(this, op, cb);
        }

        var model = this.model,
            lean = this._mongooseOptions.lean,
            promise;

        if (typeof op === 'function') {
            cb = op;
            op = null;
        } else {
            cb = cb || function(){};
        }
console.log('HERE')

        var resolver = function(resolve, reject) {
            _exec.call(this, op, function(err, docs){
                if (err) {
                    return cb(err), reject(err);
                }
                if (!docs) {
                    return cb(null, docs), resolve(docs);
                }
                var waiting = docs.map(function(doc){
                    var model = mongoose.model(doc.target_type);
                    return model
                        .findOne({ _id: doc.target_id })
                        .exec();
                });
                Q
                    .all(waiting)
                    .then(function(targets){
                        return docs.map(function(doc, i){
                            doc.set('target', targets[i] || {});
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
        };  

        // Mongoose 4.1.x and up
        if (mongoose.Promise.ES6) {
            promise = new mongoose.Promise.ES6(resolver);
        } else {
            promise = new mongoose.Promise;
            resolver(promise.resolve.bind(promise, null), promise.reject.bind(promise));
        }

        return promise;
    }
}