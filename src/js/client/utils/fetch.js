import authenticationActions from '../actions/AuthenticationActions';
var old_fetch = window.fetch;

window.fetch = function() {
    return old_fetch.apply(window, arguments)
        .then(function(response){
            if (response.status == 401) {
                authenticationActions.requireAuthentication();
                return null;
            }
            return response;
        });
};