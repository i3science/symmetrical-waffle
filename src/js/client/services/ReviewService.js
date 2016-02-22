import 'isomorphic-fetch';
import Q from 'q';

export default class ReviewService {
    static list(influencer) {
        return fetch('/api/influencers/'+(influencer._id || influencer)+'/reviews')
            .then((response) => {
                return Q(response.json());
            })
            .fail(() => {});
    }
    static find(influencer, id) {
        return fetch('/api/influencers/'+(influencer._id || influencer)+'/reviews/'+id)
            .then((response) => {
                return Q(response.json());
            })
            .fail(() => {});
    }
    static create(influencer, review) {
        return fetch('/api/influencers/'+(influencer._id || influencer)+'/reviews', {
            method: 'post',
            body: JSON.stringify(review),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .fail(() => {});
    }
    static update(influencer, review) {
        return fetch('/api/influencers/'+(influencer._id || influencer)+'/reviews/'+influencer._id, {
            method: 'put',
            body: JSON.stringify(review),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .fail(() => {});
    }
}