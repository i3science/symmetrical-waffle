import 'isomorphic-fetch';
import Q from 'q';

export default class CommentService {
    static list(project, element) {
        return fetch('/api/projects/'+project+'/elements/'+element+'/comments')
            .then((response) => {
                return Q(response.json());
            })
            .fail(() => {});
    }
    static find(project, element, comment) {
        return fetch('/api/projects/'+project+'/elements/'+element+'/comments/'+comment)
            .then((response) => {
                return Q(response.json());
            })
            .fail(() => {});
    }
    static create(project, element, comment) {
        return fetch('/api/projects/'+project+'/elements/'+element+'/comments', {
            method: 'post',
            body: JSON.stringify(comment),
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
    static update(project, element, comment) {
        return fetch('/api/projects/'+project+'/elements/'+element+'/comments/'+comment._id, {
            method: 'put',
            body: JSON.stringify(comment),
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
}