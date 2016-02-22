import React from 'react';
import influencerStore from '../../stores/InfluencerStore';
import Profile from './profile/profile';

class ProfilePage extends React.Component {
    constructor() {
        super();
        this.state = {
            influencer: {}
        };
    }
    componentWillMount() {
        this.state.influencer = influencerStore.getInfluencerById(this.props.params.id);
        this.setState({influencer: this.state.influencer});
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