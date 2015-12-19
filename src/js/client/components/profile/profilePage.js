import React from 'react';
import AppStore from '../../stores/store';
import Profile from './profile';

class ProfilePage extends React.Component {
    constructor() {
        super();
        this.state = {
            influencers: AppStore.getAllInfluencers()
        };
    }
    componentWillMount() {
        var influencerId = this.props.params._id ? this.props.params.id : null;
        if (influencerId) {
            this.setState({influencer: AppStore.getInfluencerById(influencerId)});
        }
    }
    render() {
        return (
            <Profile
                influencer={this.state.influencer}
            />
        );
    }
}

export default ProfilePage;