import userService from '../services/UserService';
import base_controller from './base_controller';

export default base_controller(userService, 'user', {
    me(req, res) {
        return res.json(req.loggedInUser);
    },
    sanitize(obj) {
        delete obj.password;
        delete obj.passwordConfirmation;
        delete obj.passwordResetToken;
        return obj;
    }
});