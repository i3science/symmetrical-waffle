import 'isomorphic-fetch';

class InfluencerService {
    list() {
        return fetch('/api/influencers', {
            credentials: 'same-origin'
        })
            .then(function(response){
                return response.json();
            });
    }
}

export default new InfluencerService();