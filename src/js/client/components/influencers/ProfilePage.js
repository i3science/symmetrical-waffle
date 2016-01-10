import React from 'react';
import InfluencerStore from '../../stores/InfluencerStore';
import Profile from './profile/profile';

class ProfilePage extends React.Component {
    constructor() {
        super();
        this.state = {
            influencers: InfluencerStore.getInfluencers()
        };
    }
    componentWillMount() {
        var influencerId = this.props.params._id ? this.props.params.id : null;
        if (influencerId) {
            this.setState({influencer: InfluencerStore.getInfluencerById(influencerId)});
        }
    }
    render() {
        return (
            <Profile
                influencer={this.state.influencer} />
        );
    }
}

export default ProfilePage;