import authenticationActions from '../actions/AuthenticationActions';
var old_fetch = window.fetch;

window.fetch = function() {
    let args = Array.prototype.slice.call(arguments);
    args[1] = args[1] || {};
    args[1].credentials = 'same-origin';
    return old_fetch.apply(window, args)
        .then(function(response){
            if (response.status == 401) {
                authenticationActions.requireAuthentication();
                throw new Error('Unauthorized');
            }
            return response.json();
        });
};