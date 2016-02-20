import 'isomorphic-fetch';
import Q from 'q';

export default {
    list(type, id, children) {
        return fetch('/api/'+type+'/'+id+'/history?children='+(!!children))
            .then((response) => {
                return Q(response.json());
            })
            .fail(() => {});
    },
    listForElement(project, element) {
        return fetch('/api/projects/'+(project._id || project)+'/elements/'+(element._id || element)+'/history')
            .then((response) => {
                return Q(response.json());
            })
            .fail(() => {});
    }
};