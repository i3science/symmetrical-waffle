import 'isomorphic-fetch';

export default class ListService {
    list() {
        return fetch('/api/lists');
    }
    find(id) {
        return fetch('/api/lists/'+id)
            .catch(() => {});
    }
    create(list) {
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
    update(list) {
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