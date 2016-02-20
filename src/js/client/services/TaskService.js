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
        return fetch('/api/projects/'+project+'/elements/'+element+'/tasks', {
            method: 'post',
            body: JSON.stringify(task),
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
    static update(project, element, task) {
        return fetch('/api/projects/'+project+'/elements/'+element+'/tasks/'+task._id, {
            method: 'put',
            body: JSON.stringify(task),
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