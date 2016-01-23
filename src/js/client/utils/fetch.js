/* global Materialize */

import authenticationActions from '../actions/AuthenticationActions';

if (typeof window !== 'undefined') {
    var old_fetch = window.fetch;

    window.fetch = function() {
        let args = Array.prototype.slice.call(arguments);
        args[1] = args[1] || {};
        args[1].credentials = 'same-origin';
        return old_fetch.apply(window, args)
            .then(function(response){
                return response
                    .json()
                    .then(function(data){
                        var r = {
                            status: response.status,
                            content: data
                        };
                        if (response.status < 400) {
                            return r;
                        }
                        if (response.status == 401) {
                            authenticationActions.requireAuthentication();
                        }
                        throw r;
                    });
            })
            .catch(function(err){
                if (err.status >= 400 && err.content.message) {
                    Materialize.toast(err.content.message, 4000, 'error');
                }
                throw err;
            });
    };
}