import AuthenticationConstants from '../constants/authentication';
import authenticationService from '../services/AuthenticationService';
import { dispatch } from '../dispatcher/dispatcher';
import routerStore from '../stores/RouterStore';

export default class AuthenticationActions {

    static requireAuthentication() {
        routerStore.get().props.history.pushState(null, '/login');
        dispatch({
            actionType: AuthenticationConstants.REQUIRE_AUTHENTICATION,
            redirectLocation: window.location.pathname
        });
    }

    static signin(user, pass) {
        let self = this;
        authenticationService.signin(user, pass)
            .then((response) => {
                return response.json()
                    .then((data) => {
                        return [response.status, data];
                    });
            })
            .then((data) => {
                if (data[0] !== 200 || !data[1]._id) {
                    throw { message: 'Invalid user id or password' };
                }
                self.userAuthenticated(data[1]);
            });
    }

    static userAuthenticated(user) {
        routerStore.get().props.history.pushState(null, '/');
        localStorage.setItem('user', user);
        dispatch({
            actionType: AuthenticationConstants.USER_AUTHENTICATED,
            user: user
        });
    }
}