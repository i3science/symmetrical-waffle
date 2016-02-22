import 'isomorphic-fetch';
import Q from 'q';

export default class AssetService {
    static list(project) {
        return fetch('/api/projects/'+(project._id || project)+'/assets')
            .then((response) => {
                return Q(response.json());
            })
            .fail(() => {});
    }
    static find(project, id) {
        return fetch('/api/projects/'+(project._id || project)+'/assets/'+id)
            .then((response) => {
                return Q(response.json());
            })
            .fail(() => {});
    }
    static create(project, asset) {
        let headers = {
            'Accept': 'application/json'
        };
        if (!(asset instanceof FormData)) {
            headers['Content-Type'] = 'application/json';
        }
        return fetch('/api/projects/'+(project._id || project)+'/assets', {
            method: 'post',
            body: asset instanceof FormData ? asset : JSON.stringify(asset),
            headers: headers
        })
            .then((response) => {
                return Q(response.json());
            })
            .fail(() => {});
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
            .fail(() => {});
    }
}