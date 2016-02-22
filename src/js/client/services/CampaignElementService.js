import 'isomorphic-fetch';
import Q from 'q';

export default class CampaignElementService {
    static list(project) {
        return fetch('/api/projects/'+(project._id||project)+'/elements')
            .then((response) => {
                return Q(response.json());
            })
            .fail(() => {});
    }
    static find(project, element) {
        return fetch('/api/projects/'+project+'/elements/'+element)
            .then((response) => {
                return Q(response.json());
            })
            .fail(() => {});
    }
    static listAssignees(project, element) {
        return fetch('/api/projects/'+project+'/elements/'+element+'/assignees')
            .then((response) => {
                return Q(response.json());
            })
            .fail(() => {});
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
            .fail(() => {});
    }
}