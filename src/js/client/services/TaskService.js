import 'isomorphic-fetch';
import Q from 'q';

export default class TaskService {
    static list(project, element) {
        return fetch('/api/projects/'+project+'/elements/'+element+'/tasks')
            .then((response) => {
                return Q(response.json());
            })
            .fail(() => {});
    }
    static find(project, element, task) {
        return fetch('/api/projects/'+project+'/elements/'+element+'/tasks/'+task)
            .then((response) => {
                return Q(response.json());
            })
            .fail(() => {});
    }
    static create(project, element, task) {
        let headers = {
            'Accept': 'application/json'
        };
        if (!(task instanceof FormData)) {
            headers['Content-Type'] = 'application/json';
        }
        return fetch('/api/projects/'+project+'/elements/'+element+'/tasks', {
            method: 'post',
            body: task instanceof FormData ? task : JSON.stringify(task),
            headers: headers
        })
            .then((response) => {
                return Q(response.json());
            })
            .fail(() => {});
    }
    static update(project, element, task) {
        let headers = {
            'Accept': 'application/json'
        };
        if (!(task instanceof FormData)) {
            headers['Content-Type'] = 'application/json';
        }
        return fetch('/api/projects/'+project+'/elements/'+element+'/tasks/'+task._id, {
            method: 'put',
            body: task instanceof FormData ? task : JSON.stringify(task),
            headers: headers
        })
            .then(() => {
                return true;
            })
            .fail(() => {});
    }
}