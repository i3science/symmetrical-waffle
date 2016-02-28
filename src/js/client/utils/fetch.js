/* global Materialize */

import Q from 'q';
import authenticationActions from '../actions/AuthenticationActions';

var old_fetch = global.fetch;

/**
 * Perform a fetch action against a remote host, returning a promise that
 * resolves to the raw fetch response.
 *
 * Automatically handles error messages provided in the response JSON by
 * toasting them.
 */
global.fetch = function() {
    let args = Array.prototype.slice.call(arguments);
    args[1] = args[1] || {};
    args[1].credentials = 'same-origin';

    // Check for querystring parameters
    if ('params' in args[1]) {
        args[0] = args[0] + '?' + Object.keys(args[1].params).map((key) => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(args[1].params[key]);
        }).join('&');
    }

    return Q(old_fetch.apply(this, args))
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

                        if (data.fields) {
                            Object.keys(data.fields).forEach(function(field){
                                Materialize.toast(data.fields[field].message, 4000, 'error');
                            });
                        }
                    });
            }

            // Error out by throwing the entire response
            if (response.status >= 400) {
                throw response;
            }

            return Q(response);
        })
        .fail(function(response){
            if (response.status === 401) {
                authenticationActions.requireAuthentication();
            }
            throw response;
        });
};