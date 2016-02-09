import 'isomorphic-fetch';

class ProjectService {
    list() {
        return fetch('/api/projects');
    }
    find(id) {
        return fetch('/api/projects/'+id)
            .then((response) => {
                return response.json();
            })
            .catch(() => {});
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
            .catch(() => {});
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
            .catch(() => {});
    }
}

export default new ProjectService();