import commentService from '../services/CommentService.js';
import base_controller from './base_controller';
import ErrorUtils from '../utils/ErrorUtils';

export default base_controller(commentService, 'comment', {
    list(req, res) {
        return commentService
            .list({ target_id: req.element._id })
            .then((comments) => {
                return res.json(comments);
            })
            .fail(ErrorUtils.failureHandler(req, res));
    },
    create(req, res) {
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
});