import React from 'react'; // eslint-disable-line no-unused-vars
import { Link } from 'react-router';
import InfluencerCardList from '../../influencers/list/CardList';
import influencerStore from '../../../stores/InfluencerStore';
import userService from '../../../services/UserService';

class InfluencerPrefsPage extends React.Component {
    constructor() {
        super();
        this._onChange = this._onChange.bind(this);
        this.state = {
            influencers: influencerStore.getInfluencers()
        };
    }

    static name() {
        return 'Influencers';
    }

    componentWillMount() {
        influencerStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        influencerStore.removeChangeListener(this._onChange);
    }

    _onChange() {
        this.setState({
            influencers: influencerStore.getInfluencers(),
            selectedInfluencers: influencerStore.getSelectedInfluencers()
        });
    }

    _onSubmit(ev) {
        ev.preventDefault();
        userService
            .save(this.state.user)
            .then(function(response){
                alert(response);
            });
    }

    render() {
        return (
            <div>
                <form onSubmit={this._onSubmit.bind(this)}>
                    <input type="text" name="influencer_name" id="influencer_name"/>
                    <input type="submit" value="go get'em"/>
                </form>

                <div>
                    <Link to="/prefs/influencers/create">Add an influencer</Link>
                </div>

                <InfluencerCardList influencers={this.state.influencers}/>
            </div>
        );
    }

}
export default InfluencerPrefsPage;