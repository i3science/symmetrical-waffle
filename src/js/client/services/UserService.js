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
}

export default new UserService();