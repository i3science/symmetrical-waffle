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
    influencerReject(project, notes) {
        return fetch('/api/projects/'+(project._id || project)+'/reject', {
            method: 'put',
            body: JSON.stringify({ notes: notes }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .fail(() => {});
    }
    influencerRevise(project, notes) {
        return fetch('/api/projects/'+(project._id || project)+'/revise', {
            method: 'put',
            body: JSON.stringify({ notes: notes }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .fail(() => {});
    }
    influencerAccept(project, notes) {
        return fetch('/api/projects/'+(project._id || project)+'/accept', {
            method: 'put',
            body: JSON.stringify({ notes: notes }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .fail(() => {});
    }
    getDates(project) {
        return fetch('/api/projects/'+(project._id || project)+'/dates')
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error('An error occurred while loading project milestones');
                }
                return response.json();
            });
    }
    approve(project) {
        return fetch('/api/projects/'+(project._id || project)+'/approve', {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                if (response.status !== 204) {
                    throw new Error('An error prevented us from recording your choice');
                }
                return true;
            });
    }
    sendToClient(project) {
        return fetch('/api/projects/'+(project._id || project)+'/send-to-client', {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                if (response.status !== 204) {
                    throw new Error('An error prevented us from sending an email to the client. The client can still log in a view the project though.');
                }
                return true;
            });
    }
}

export default new ProjectService();