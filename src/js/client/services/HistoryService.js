import 'isomorphic-fetch';

export default {
    list(type, id, children) {
        return fetch('/api/'+type+'/'+id+'/history?children='+(!!children))
            .then((response) => {
                return response.json();
            })
            .catch(() => {});
    },
    listForElement(project, element) {
        return fetch('/api/projects/'+(project._id || project)+'/elements/'+(element._id || element)+'/history')
            .then((response) => {
                return response.json();
            })
            .catch(() => {});
    }
};