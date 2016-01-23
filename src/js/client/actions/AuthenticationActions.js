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

    userAuthenticated: (user) => {
        routerStore.get().props.history.pushState(null, '/');
        localStorage.setItem('user', user);
        dispatch({
            actionType: AuthenticationConstants.USER_AUTHENTICATED,
            user: user
        });
    }
};