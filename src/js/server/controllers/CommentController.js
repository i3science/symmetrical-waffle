import commentService from '../services/CommentService.js';
import ErrorUtils from '../utils/ErrorUtils';

/**
 * The CommentController is responsible for interpreting client requests
 * and formatting a response back to the client, often delegating to an
 * CampaignElementService instance.
 */
export default class CommentController {
    /**
     * Retrieves zero or more entities that adhere to the given criteria.
     */
    static list(req, res) {
        return commentService
            .list({ target_id: req.element._id })
            .then((comments) => {
                return res.json(comments);
            })
            .fail(ErrorUtils.failureHandler(req, res));
    }
    /**
     * Retrieves the comment indicated by the taskId request parameter.
     */
    static read(req, res) {
        return res.json(req.task);
    }
    /**
     * Creates a new comment with the given information.
     */
    static create(req, res) {
        req.body.target_type = 'CampaignElement';
        req.body.target_id = req.element._id;
        req.body.author = req.loggedInUser;
        return commentService
            .create(req.body)
            .spread((comment) => {
                return res.status(201).send({ id: comment._id });
            })
            .fail(ErrorUtils.failureHandler(req, res));
    }
    /**
     * Updates an existing comment with the given modifications.
     */
    static update(req, res) {
        return commentService
            .update(req.comment, req.body)
            .spread(() => {
                return res.status(204).send();
            })
            .fail(ErrorUtils.failureHandler(req, res));
    }
    /**
     * Delete an existing comment.
     */
    static delete(req, res) {
        return commentService
            .remove(req.comment)
            .spread(() => {
                return res.status(204).send();
            })
            .fail(ErrorUtils.failureHandler(req, res));
    }

    /**
     * Comment middleware
     */
    static findById(req, res, next, commentId) {
        commentService
            .findOne({ _id: commentId })
            .then((comment) => {
                req.comment = comment;
                return next();
            })
            .fail((err) => {
                return next(err);
            });
    }
}