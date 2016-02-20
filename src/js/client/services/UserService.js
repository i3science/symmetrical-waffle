import 'isomorphic-fetch';
import Q from 'q';

class UserService {
    list(opts) {
        return fetch('/api/users', {
            method: 'get',
            params: opts || {},
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .then((response) => {
                return Q(response.json());
            })
            .fail(() => {});
    }
    find(id) {
        return fetch('/api/users/'+id)
            .then((response) => {
                return Q(response.json());
            })
            .fail(() => {});
    }
    getCurrentUser() {
        return fetch('/api/users/me')
            .then((response) => {
                return Q(response.json());
            })
            .fail(() => {});
    }
    create(user) {
        return fetch('/api/users/', {
            method: 'post',
            body: JSON.stringify(user),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .fail(() => {});
    }
    update(user) {
        return fetch('/api/users/'+user._id, {
            method: 'put',
            body: JSON.stringify(user),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .fail(() => {});
    }
    save(user) {
        return (user._id ? this.update(user) : this.create(user))
            .fail(() => {});
    }
}

export default new UserService();