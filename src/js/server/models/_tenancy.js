var context = require('request-local'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema;

module.exports = exports = function(limits) {
    return function auditingPlugin(schema) {
        schema.add({
            organization: {
                type: Schema.Types.ObjectId,
                ref: 'Organization',
                required: true
            }
        });

        function findByOrganization(next) {
            let org = context.currentOrganization || {};
            this.where({organization: org._id});
            next();
        }

        schema.pre('find', findByOrganization);
        schema.pre('findOne', findByOrganization);
        schema.pre('findOneAndUpdate', findByOrganization);
        schema.pre('count', findByOrganization);

        if (limits) {
            schema.pre('find', limits);
            schema.pre('findOne', limits);
            schema.pre('findOneAndUpdate', limits);
            schema.pre('count', limits);
        }
    };
};