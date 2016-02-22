import 'isomorphic-fetch';
import Q from 'q';

class ProjectService {
    list() {
        return fetch('/api/projects')
            .then((response) => {
                return Q(response.json());
            })
            .fail(() => {});
    }
    find(id) {
        return fetch('/api/projects/'+id)
            .then((response) => {
                return Q(response.json());
            })
            .fail(() => {});
    }
    create(project) {
        return fetch('/api/projects/', {
            method: 'post',
            body: JSON.stringify(project),
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
    update(project) {
        return fetch('/api/projects/'+project._id, {
            method: 'put',
            body: JSON.stringify(project),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .fail(() => {});
    }
}

export default new ProjectService();