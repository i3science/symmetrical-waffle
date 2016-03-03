import influencerService from '../services/InfluencerService.js';
import base_controller from './base_controller';
import ErrorUtils from '../utils/ErrorUtils';

export default base_controller(influencerService, 'influencer', {
	send(req, res) {
		return influencerService
			.send(req.influencer)
			.then(() => {
				return res.status(204).send();
			})
            .fail(ErrorUtils.failureHandler(req, res));
	}
});