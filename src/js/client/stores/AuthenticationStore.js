import BaseStore from './BaseStore';
import AuthenticationConstants from '../constants/authentication';
import context from 'request-context';

class AuthenticationStore extends BaseStore {

    constructor() {
        super();
        this._user = null;
        this._jwt = null;
        this._redirectLocation = null;

        if (typeof window !== 'undefined' && window.initial_data.user) {
            this._user = window.initial_data.user;
        }
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

    get jwt() {
        return this._jwt;
    }
    isLoggedIn() {
        return !!this.getCurrentUser();
    }
    get redirectLocation() {
        return this._redirectLocation;
    }
    getCurrentUser() {
        if (this._user) {
            return this._user;
        }
        return context.get('request:currentUser');
    }
}

export default new AuthenticationStore();