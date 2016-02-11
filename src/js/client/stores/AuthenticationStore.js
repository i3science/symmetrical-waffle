import Q from 'q';
import BaseStore from './BaseStore';
import AuthenticationConstants from '../constants/authentication';
import userService from '../services/UserService';

class AuthenticationStore extends BaseStore {

    constructor() {
        super();
        this._user = null;
        this._jwt = null;
        this._redirectLocation = null;
    }

    _listener(action) {
        if (!action) {
            return;
        }
        switch(action.actionType) {
            case AuthenticationConstants.REQUIRE_AUTHENTICATION:
                this._redirectLocation = action.redirectLocation;
                this.emitChange();
                break;
            case AuthenticationConstants.USER_AUTHENTICATED:
                this._user = action.user;
                this._redirectLocation = null;
                this.emitChange();
                break;
            default:
                break;
        }
    }

    get user() {
        return this._user;
    }
    get jwt() {
        return this._jwt;
    }
    isLoggedIn() {
        return !!this._user;
    }
    get redirectLocation() {
        return this._redirectLocation;
    }

    getCurrentUser() {
        if (self._user) {
            return Q.all(self._user);
        }
        return userService
            .getCurrentUser()
            .then((data) => {
                self._user = data;
                this.emitChange();
                return data;
            });
    }
}

export default new AuthenticationStore();