import 'isomorphic-fetch';

export default class CommentService {
    static list(project, element) {
        return fetch('/api/projects/'+project+'/elements/'+element+'/comments')
            .then((response) => {
                return response.json();
            })
            .catch(() => {});
    }
    static find(project, element, comment) {
        return fetch('/api/projects/'+project+'/elements/'+element+'/comments/'+comment)
            .then((response) => {
                return response.json();
            })
            .catch(() => {});
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
                return response.json();
            })
            .catch(() => {});
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
            .catch(() => {});
    }
}