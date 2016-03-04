import representativeService from '../services/RepresentativeService.js';
import userService from '../services/UserService.js';
import base_controller from './base_controller';
import ErrorUtils from '../utils/ErrorUtils';

export default base_controller(representativeService, 'representative', {
	send(req, res) {
		return userService
			.sendAccountCreatedNotification(req.representative)
			.then(() => {
				return res.status(204).send();
			})
            .fail(ErrorUtils.failureHandler(req, res));
	}
});