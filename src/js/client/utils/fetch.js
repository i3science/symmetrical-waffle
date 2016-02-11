/* global Materialize */

import authenticationActions from '../actions/AuthenticationActions';

if (typeof window !== 'undefined') {
    var old_fetch = window.fetch;

    /**
     * Perform a fetch action against a remote host, returning a promise that
     * resolves to the raw fetch response.
     *
     * Automatically handles error messages provided in the response JSON by
     * toasting them.
     */
    window.fetch = function() {
        let args = Array.prototype.slice.call(arguments);
        args[1] = args[1] || {};
        args[1].credentials = 'same-origin';

        // Check for querystring parameters
        if ('params' in args[1]) {
            args[0] = args[0] + '?' + Object.keys(args[1].params).map((key) => {
                return encodeURIComponent(key) + '=' + encodeURIComponent(args[1].params[key]);
            }).join('&');
        }

        return old_fetch.apply(window, args)
            .then(function(response){
                if (response.headers.get('Content-Type')) {
                    // Check for flash messages
                    var tmp = response.clone();
                    tmp
                        .json()
                        .then(function(data){
                            let messages = [].concat(data.messages || []).concat(data.message);
                            messages.forEach(function(message){
                                Materialize.toast(message, 4000, 'error');
                            });
                        });
                }

                // Error out by throwing the entire response
                if (response.status >= 400) {
                    throw response;
                }

                return response;
            })
            .catch(function(response){
                if (response.status === 401) {
                    authenticationActions.requireAuthentication();
                }
                throw response;
            });
    };
}