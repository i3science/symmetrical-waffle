import React from 'react';
//import { Link } from 'react-router';
//import _ from 'lodash';
import Actions from '../../../actions/UiActions';
import listStore from '../../../stores/ListStore';
import influencerStore from '../../../stores/InfluencerStore';
import Card from '../../common/Card';

import InfluencerCardList from '../../influencers/list/CardList';

class ListPage extends React.Component {
    constructor() {
        super();
        this.state = {
            list: {
                name: ''
            },
            influencers: []
        };
        this._onChange = this._onChange.bind(this);
        this._createProject = this._createProject.bind(this);
        this._editList = this._editList.bind(this);
    }
    componentWillMount() {
        influencerStore.addChangeListener(this._onChange);
        Actions.refreshInfluencerList();
        var list = listStore.getListById(this.props.params.id);
        this.setState({list: list});
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
    _createProject() {
        Actions.setCurrentList(this.state.list);
        this.props.history.pushState(null, '/projects/create');
    }
    _editList() {
        Actions.setCurrentList(this.state.list);
        this.props.history.pushState(null, '/search');
    }
    render() {
        return (
            <div>
                <Card title={this.state.list.name} deep>
                    <div className="row">
                        <div className="col s6 separate-right">
                            <div className="center-align">
                                <h6 className="teal-text" style={{marginBottom: '20px'}}>Add influencers to this list</h6>
                                <br />
                                <button
                                    type="button"
                                    className="teal waves-effect waves-light btn-large center"
                                    onClick={this._editList.bind(this)}>
                                    <i className="material-icons right">person_add</i>Add
                                </button>
                            </div>
                        </div>
                        <div className="col s6">
                            <div className="center-align">
                                <h6 className="teal-text" style={{marginBottom: '20px'}}>Create a project with this list</h6>
                                <br />
                                <button
                                    type="button"
                                    className="teal waves-effect waves-light btn-large center"
                                    onClick={this._createProject.bind(this)}>
                                    <i className="material-icons right">create_new_folder</i>Create
                                </button>
                            </div>
                        </div>
                    </div>
                </Card>

                <InfluencerCardList
                    influencers={this.state.influencers}
                />
            </div>


        );
    }
}

export default ListPage;