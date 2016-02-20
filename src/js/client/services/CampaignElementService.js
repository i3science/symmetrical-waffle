import 'isomorphic-fetch';

export default class CampaignElementService {
    static list(project) {
        return fetch('/api/projects/'+project._id+'/elements')
            .then((response) => {
                return response.json();
            })
            .catch(() => {});
    }
    static find(project, element) {
        return fetch('/api/projects/'+project+'/elements/'+element)
            .then((response) => {
                return response.json();
            })
            .catch(() => {});
    }
    static listAssignees(project, element) {
        return fetch('/api/projects/'+project+'/elements/'+element+'/assignees')
            .then((response) => {
                return response.json();
            })
            .catch(() => {});
    }
    static update(project, element) {
        return fetch('/api/projects/'+project+'/elements/'+element._id, {
            method: 'put',
            body: JSON.stringify(element),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                if (response.status !== 201) {
                    throw response;
                }
                return response;
            })
            .catch(() => {});
    }
}