class AuthenticationService {

    signin(email, password) {
        let body = {
            email: email,
            password: password
        };

        return fetch('/auth/signin', {
            credentials: 'same-origin',
            method: 'POST',
            body: Object.keys(body).reduce(function(a,k){
                a.push(encodeURIComponent(k)+'='+encodeURIComponent(body[k]));
                return a;
            },[]).join('&'),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    }
    
}

export default new AuthenticationService();