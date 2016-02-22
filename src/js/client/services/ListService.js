import 'isomorphic-fetch';
import Q from 'q';

export default class ListService {
    static list() {
        return fetch('/api/lists')
            .then((response) => {
                return Q.all(response.json());
            })
            .fail(() => {});
    }
    static find(id) {
        return fetch('/api/lists/'+id)
            .then((response) => {
                return Q(response.json());
            })
            .fail(() => {});
    }
    static create(list) {
        return fetch('/api/lists/', {
            method: 'post',
            body: JSON.stringify(list),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .fail(() => {});
    }
    static update(list) {
        return fetch('/api/lists/'+list._id, {
            method: 'put',
            body: JSON.stringify(list),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .fail(() => {});
    }
}