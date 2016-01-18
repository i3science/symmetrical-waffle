import React from 'react';
import influencerStore from '../../stores/InfluencerStore';
import Profile from './profile/profile';


class ProfilePage extends React.Component {
    constructor() {
        super();
        this.state = {
            influencer: {}
        };
        this._onChange = this._onChange.bind(this);
    }
    componentWillMount() {
        influencerStore.addChangeListener(this._onChange);
    }
    componentWillUnmount() {
        influencerStore.removeChangeListener(this._onChange);
    }
    _onChange() {
        var influencerId = this.props.params.id || null;

        if (influencerId) {
            this.setState({influencer: influencerStore.getInfluencerById(influencerId)});
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