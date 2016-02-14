import mongoose from 'mongoose';
import base_service from './base_service';
let Project = mongoose.model('Project');

export default base_service(Project, {
    list(opts) {
        return Project
            .find(opts || {})
            .populate('client')
            .exec();
    },
    findOne(opts) {
        return Project
            .findOne(opts || {})
            .populate('client')
            .exec();
    }
});