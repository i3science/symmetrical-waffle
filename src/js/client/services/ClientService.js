import 'isomorphic-fetch';

export default class ClientService {
    static list() {
        return fetch('/api/clients')
            .then((response) => {
                return response.json();
            })
            .catch(() => {});
    }
    static find(id) {
        return fetch('/api/clients/'+id)
            .then((response) => {
                return response.json();
            })
            .catch(() => {});
    }
    static create(client) {
        return fetch('/api/clients', {
            method: 'post',
            body: JSON.stringify(client),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                return response.json();
            })
            .catch(() => {});
    }
    static update(client) {
        return fetch('/api/clients/'+client._id, {
            method: 'put',
            body: JSON.stringify(client),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(() => {
                return true;
            })
            .catch(() => {});
    }
}