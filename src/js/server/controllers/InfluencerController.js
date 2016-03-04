import influencerService from '../services/InfluencerService.js';
import userService from '../services/UserService.js';
import base_controller from './base_controller';
import ErrorUtils from '../utils/ErrorUtils';

export default base_controller(influencerService, 'influencer', {
	send(req, res) {
		return userService
			.sendAccountCreatedNotification(req.influencer)
			.then(() => {
				return res.status(204).send();
			})
            .fail(ErrorUtils.failureHandler(req, res));
	}
});