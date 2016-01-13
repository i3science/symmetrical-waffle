import 'isomorphic-fetch';

class UserService {
    list() {
        return fetch('/api/users');
    }
    find(id) {
        return fetch('/api/users/'+id);
    }
    getCurrentUser() {
        return fetch('/api/users/me');
    }
    create(user) {
        return fetch('/api/users/', {
            method: 'post',
            body: JSON.stringify(user),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
    }
    update(user) {
        return fetch('/api/users/'+user._id, {
            method: 'put',
            body: JSON.stringify(user),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
    }
    save(user) {
        return user._id ? this.update(user) : this.create(user);
    }
}

export default new UserService();