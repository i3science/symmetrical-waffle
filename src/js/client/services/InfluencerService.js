import 'isomorphic-fetch';

class InfluencerService {
    list() {
        return fetch('/api/influencers');
    }
    find(id) {
        return fetch('/api/influencers/'+id)
            .fail(() => {});
    }
    create(influencer) {
        return fetch('/api/influencers/', {
            method: 'post',
            body: JSON.stringify(influencer),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .fail(() => {});
    }
    update(influencer) {
        return fetch('/api/influencers/'+influencer._id, {
            method: 'put',
            body: JSON.stringify(influencer),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .fail(() => {});
    }
    save(influencer) {
        return (influencer._id ? this.update(influencer) : this.create(influencer))
            .fail(() => {});
    }
    send(influencer) {
        return fetch('/api/influencers/'+influencer._id+'/send')
            .then((response) => {
                if (response.status !== 204) {
                    throw new Error('Unable to send email to influencer');
                }
                return true;
            });
    }
}

export default new InfluencerService();