import 'isomorphic-fetch';
import restful, { fetchBackend } from 'restful.js';

let api = restful('/api', fetchBackend(fetch));
let influencersCollection = api.all('influencers');

class InfluencerService {
    static list() {
        return influencersCollection.getAll()
            .then(function(result){
                return result.body();
            });
    }
}

export default InfluencerService;