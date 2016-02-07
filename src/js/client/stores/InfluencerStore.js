import BaseStore from './BaseStore';
import AppConstants from '../constants/constants';
import _ from 'lodash';

class InfluencerStore extends BaseStore {

    constructor() {
        super();
        this.currentInfluencerId = '';
        this.influencers = [];
        this.selectedInfluencers = [];
    }

    _listener(action) {
        if (!action) {
            return;
        }

        switch(action.actionType) {
            case AppConstants.INFLUENCER_LIST_REFRESHED:
                this.influencers = action.influencers;
                this.selectedInfluencers = action.selectedInfluencers;
                this.emitChange();
                break;
            case AppConstants.ADD_INFLUENCER_TO_LIST:
                this.selectedInfluencers.push(action.influencer);
                this.emitChange();
                break;
            case AppConstants.CREATE_INFLUENCER:
                this.influencers.push(action.influencer);
                this.currentInfluencerId = action.influencer._id;
                this.emitChange();
                break;
        }
    }

    getInfluencers() {
        return this.influencers;
    }
    getSelectedInfluencers() {
        return this.selectedInfluencers;
    }
    getInfluencerById(id) {
        console.log(_.find(this.influencers, {_id: id}));
        return _.find(this.influencers, {_id: id});
    }
    getCurrentInfluencer() {
        return _.find(this.influencers, {_id: this.currentInfluencerId});

    }
}

export default new InfluencerStore();