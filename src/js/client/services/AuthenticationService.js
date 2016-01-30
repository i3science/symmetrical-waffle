import 'isomorphic-fetch';

class AuthenticationService {

    signin(email, password) {
        let body = {
            email: email,
            password: password
        };

        return fetch('/auth/signin', {
            credentials: 'same-origin',
            method: 'POST',
            body: Object.keys(body).reduce((a,k) => {
                a.push(encodeURIComponent(k)+'='+encodeURIComponent(body[k]));
                return a;
            },[]).join('&'),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    }

    requestPasswordReset(email) {
        let body = {
            email: email
        };

        return fetch('/auth/forgot-password', {
            credentials: 'same-origin',
            method: 'POST',
            body: Object.keys(body).reduce((a,k) => {
                a.push(encodeURIComponent(k)+'='+encodeURIComponent(body[k]));
                return a;
            },[]).join('&'),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .then((response) => {
                if (response.status !== 204) {
                    throw response;
                }
            });
    }

    resetPassword(token, password, passwordConfirmation) {
        let body = {
            token: token,
            password: password,
            passwordConfirmation: passwordConfirmation
        };
        return fetch('/auth/reset-password', {
            method: 'POST',
            body: Object.keys(body).reduce((a,k) => {
                a.push(encodeURIComponent(k)+'='+encodeURIComponent(body[k]));
                return a;
            },[]).join('&'),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .then((response) => {
                if (response.status !== 204) {
                    throw response;
                }
                return true;
            });
    }
    
}

export default new AuthenticationService();