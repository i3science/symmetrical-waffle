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
}