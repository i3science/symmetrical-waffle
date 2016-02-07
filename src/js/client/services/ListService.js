import 'isomorphic-fetch';

export default class ListService {
    static list() {
        return fetch('/api/lists')
            .then((response) => {
                return response.json();
            })
            .then((lists) => {
                return lists;
            })
            .catch(() => {});
    }
    static find(id) {
        return fetch('/api/lists/'+id)
            .catch(() => {});
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
            .catch(() => {});
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
            .catch(() => {});
    }
}