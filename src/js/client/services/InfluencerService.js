import 'isomorphic-fetch';

class InfluencerService {
    list() {
        return fetch('/api/influencers');
    }
    find(id) {
        return fetch('/api/influencers/'+id);
    }
    create(influencer) {
        return fetch('/api/influencers/', {
            method: 'post',
            body: JSON.stringify(influencer),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
    }
    update(influencer) {
        return fetch('/api/influencers/'+influencer._id, {
            method: 'put',
            body: JSON.stringify(influencer),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
    }
    save(influencer) {
        return influencer._id ? this.update(influencer) : this.create(influencer);
    }
}

export default new InfluencerService();