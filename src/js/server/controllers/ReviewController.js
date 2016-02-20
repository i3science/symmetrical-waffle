import reviewService from '../services/ReviewService.js';
import base_controller from './base_controller';
import ErrorUtils from '../utils/ErrorUtils';

export default base_controller(reviewService, 'review', {
    list(req, res) {
        return reviewService
            .list({influencer: req.influencer._id})
            .then((reviews) => {
                return res.json(reviews);
            })
            .fail(ErrorUtils.failureHandler(req, res));
    },
    create(req, res) {
        let obj = this.sanitize(req.body);
        return reviewService
            .create(req.influencer, obj)
            .spread((task) => {
                return res.status(201).send({ id: task._id });
            })
            .fail(ErrorUtils.failureHandler(req, res));
    }
});