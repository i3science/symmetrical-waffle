import 'isomorphic-fetch';

export default class AssetService {
    static list(project) {
        return fetch('/api/projects/'+(project._id || project)+'/assets')
            .then((response) => {
                return response.json();
            })
            .catch(() => {});
    }
    static find(project, id) {
        return fetch('/api/projects/'+(project._id || project)+'/assets/'+id)
            .catch(() => {});
    }
    static create(project, asset) {
        return fetch('/api/projects/'+(project._id || project)+'/assets', {
            method: 'post',
            body: JSON.stringify(asset),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .catch(() => {});
    }
    static update(project, asset) {
        return fetch('/api/projects/'+(project._id || project)+'/assets/'+asset._id, {
            method: 'put',
            body: JSON.stringify(asset),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .catch(() => {});
    }
}