import mongoose from 'mongoose';
import _ from 'lodash';
let Comment = mongoose.model('Comment');

/**
 * The CommentService is responsible for persisting and retrieving information to
 * and from the underlying datastore in a consistent manner.
 */
export default class CommentService {
    /**
     * Retrieve zero or more comments that match the given options.
     * @param opts A dictionary of search options
     * @todo Document available options
     */
    static list(opts) {
        opts = opts || {};
        return Comment
            .find(opts)
            .populate('author', 'name')
            .exec();
    }

    /**
     * Retrieve zero or one comments that match the given options. In the
     * event that more than one comment matches, the first one found will be
     * returned. There is no guarantee of any sort of natural ordering.
     * @param opts A dictionary of search options
     * @todo Document available options
     */
    static findOne(opts) {
        return Comment
            .findOne(opts || {})
            .exec();
    }

    /**
     * Persist a new comment entity.
     * @param comment The representation of the comment to persist
     */
    static create(comment) {
        comment = new Comment(comment);
        return comment.savePromise();
    }

    /**
     * Update an existing comment entity.
     * @param comment The representation of the comment to update
     */
    static update(comment, modified) {
        _.extend(comment, modified);
        return comment.savePromise();
    }

    /**
     * Delete the comment represented by the given entity or identifier.
     * @param comment A JSON representation or identifier
     */
    delete(comment) {
        return comment.removePromise();
    }
}