import mongoose from 'mongoose';
import base_service from './base_service';
let Comment = mongoose.model('Comment');

export default base_service(Comment, {
    list(opts) {
        opts = opts || {};
        return Comment
            .find(opts)
            .populate('author', 'name')
            .exec();
    }
});