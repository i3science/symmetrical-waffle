import React from 'react';
//import { Link } from 'react-router';
//import _ from 'lodash';
import Actions from '../../../actions/UiActions';
import listStore from '../../../stores/ListStore';
import influencerStore from '../../../stores/InfluencerStore';

import InfluencerCardList from '../../influencers/list/CardList';

class ListPage extends React.Component {
    constructor() {
        super();
        this.state = {
            list: {},
            influencers: []
        };
        this._onChange = this._onChange.bind(this);

    }
    componentWillMount() {
        influencerStore.addChangeListener(this._onChange);
        Actions.refreshInfluencerList();
        this.state.list = listStore.getListById(this.props.params.id);
        this.setState({list: this.state.list});
    }
    componentWillUnmount() {
        influencerStore.removeChangeListener(this._onChange);
    }

    _onChange() {
        if (this.state.influencers.length === 0) {
            if (this.state.list.influencers.length > 0) {
                this.state.list.influencers.map(item => {
                    if (influencerStore.getInfluencerById(item)) {
                        this.state.influencers.push(influencerStore.getInfluencerById(item));
                    }
                });
                this.setState({influencers: this.state.influencers});
            }
        }
    }
    render() {
        console.log(this.state.influencers);
        return (
            <div>
                <div className="card-panel z-depth-4">
                    <h5 className="grey-text text-darken-2" style={{marginBottom: '30px'}}>{this.state.list.name}</h5>
                    <div className="row">

                    </div>
                </div>

                <InfluencerCardList
                    influencers={this.state.influencers}
                />
            </div>


        );
    }
}

export default ListPage;