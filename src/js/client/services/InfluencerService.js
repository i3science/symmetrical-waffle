import 'isomorphic-fetch';

class InfluencerService {
    list() {
        return fetch('/api/influencers', {
            credentials: 'same-origin'
        })
            .then(function(response){
                return response;
            });
    }
}

export default new InfluencerService();