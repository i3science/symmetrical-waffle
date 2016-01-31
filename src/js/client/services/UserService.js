import 'isomorphic-fetch';

class UserService {
    list(opts) {
        return fetch('/api/users', {
            method: 'get',
            params: opts || {},
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .catch(() => {});
    }
    find(id) {
        return fetch('/api/users/'+id)
            .then((response) => {
                return response.json();
            })
            .catch(() => {});
    }
    getCurrentUser() {
        return fetch('/api/users/me')
            .catch(() => {});
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
            .catch(() => {});
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
            .catch(() => {});
    }
    save(user) {
        return (user._id ? this.update(user) : this.create(user))
            .catch(() => {});
    }
}

export default new UserService();