import 'isomorphic-fetch';

export default class RepresentativeService {
    static list() {
        return fetch('/api/representatives')
            .then((response) => {
                return response.json();
            })
            .fail(() => {});
    }
    static find(id) {
        return fetch('/api/representatives/'+id)
            .then((response) => {
                return response.json();
            })
            .fail(() => {});
    }
    static create(representative) {
        return fetch('/api/representatives', {
            method: 'post',
            body: JSON.stringify(representative),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                return response.json();
            })
            .fail(() => {});
    }
    static update(representative) {
        return fetch('/api/representatives/'+representative._id, {
            method: 'put',
            body: JSON.stringify(representative),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(() => {
                return true;
            })
            .fail(() => {});
    }
    static send(representative) {
        return fetch('/api/representatives/'+representative._id+'/send')
            .then((response) => {
                if (response.status !== 204) {
                    throw new Error('Unable to send email to representative');
                }
                return true;
            });
    }
}