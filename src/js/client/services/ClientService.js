import 'isomorphic-fetch';
import Q from 'q';

export default class ClientService {
    static list() {
        return fetch('/api/clients')
            .then((response) => {
                return Q(response.json());
            })
            .fail(() => {});
    }
    static find(id) {
        return fetch('/api/clients/'+id)
            .then((response) => {
                return Q(response.json());
            })
            .fail(() => {});
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
                return Q(response.json());
            })
            .fail(() => {});
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
            .fail(() => {});
    }
}