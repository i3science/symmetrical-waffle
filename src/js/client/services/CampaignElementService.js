import 'isomorphic-fetch';

export default class CampaignElementService {
    static list(project) {
        return fetch('/api/projects/'+project._id+'/elements')
            .then((response) => {
                return response.json();
            })
            .catch(() => {});
    }
}