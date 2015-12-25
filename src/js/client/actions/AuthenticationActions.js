import AuthenticationConstants from '../constants/authentication';
import { dispatch } from '../dispatcher/dispatcher';
import routerStore from '../stores/RouterStore';

export default {

    requireAuthentication: () => {
        routerStore.get().props.history.pushState(null, '/login');
        dispatch({
            actionType: AuthenticationConstants.REQUIRE_AUTHENTICATION,
            redirectLocation: window.location.pathname
        });
    },

    userAuthenticated: (jwt) => {
        routerStore.get().props.history.pushState(null, '/');
        localStorage.setItem('jwt', jwt);
        dispatch({
            actionType: AuthenticationConstants.USER_AUTHENTICATED,
            jwt: jwt
        });
    }
};