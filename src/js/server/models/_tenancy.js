var context = require('request-context'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema;

module.exports = exports = function auditingPlugin(schema) {
    schema.add({
        organization: {
            type: Schema.Types.ObjectId,
            ref: 'Organization',
            required: true
        }
    });

    function findByOrganization(next) {
        this.where({organization: context.get('request:currentOrganization')._id});
        next();
    }

    schema.pre('find', findByOrganization);
    schema.pre('findOne', findByOrganization);
    schema.pre('findOneAndUpdate', findByOrganization);
    schema.pre('count', findByOrganization);
};