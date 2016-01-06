import 'isomorphic-fetch';

class InfluencerService {
    list() {
        return fetch('/api/influencers');
    }
}

export default new InfluencerService();