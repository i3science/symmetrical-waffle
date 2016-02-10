import 'isomorphic-fetch';

export default {
    list(type, id, children) {
        return fetch('/api/'+type+'/'+id+'/history?children='+(!!children))
            .then((response) => {
                return response.json();
            })
            .catch(() => {});
    }
}