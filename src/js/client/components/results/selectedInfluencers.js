import React from 'react';
import { Link } from 'react-router';
import InputText from '../common/input/inputtext';
import Actions from '../../actions/UiActions';

const Graph = (props) => {
    var selectedExposures = 0;
    let pieces = props.pieces.map((item,index) => {
        selectedExposures += item.value;
        let gwidth = item.value/props.exposures*100;
        return (
            <div key={'bar'+index} style={{width:gwidth+'%',background:item.color,height:'100%',display:'inline-block'}}>
            </div>
        );
    });
    return (
        <div className="exposures">
            <table className="search-stats">
                <thead></thead>
                <tbody>
                <tr>
                    <td>
                        <h6>Selected Exposures:</h6>
                    </td>
                    <td>
                        <h6 className="blue-text">{selectedExposures}</h6>
                    </td>
                </tr>
                </tbody>
            </table>
            <div className="collection bar">
                {pieces}
            </div>
        </div>
    );
};

const Person = (props) => {
    return (
        <div className="collection-item">
            <Link to={'/search/results/profile/'+props.influencer._id} className="grey-text text-darken-2">{props.influencer.name.first}
                <i className="secondary-content small material-icons" style={{color:props.color}}>account_circle</i>
            </Link>
            <br />
        </div>
    );
};

class SelectedInfluencers extends React.Component {
    constructor() {
        super();
        this._toggleListCreate = this._toggleListCreate.bind(this);
    }
    _createList(inf, event) {
        event.preventDefault();
        if (event.target[0].value && (inf.length > 0)) {
            let list = {
                name: event.target[0].value,
                influencers: inf
            };
            Actions.createList(list);
            this._toggleListCreate();
        }
    }
    _toggleListCreate() {
        $(this.refs.listForm).toggle();
        $(this.refs.listButton).toggle();
    }



    render() {
        var pieces = [];
        var selectedInfluencers = this.props.selectedInfluencers.map((item,index) => {
            var numIndex = String(index);

            if (numIndex.length > 1) {
                numIndex = Number(numIndex.substr(numIndex.length - 1));
            }
            let val = Number();
            for (let prop in item.channels) {
                if (item.channels.hasOwnProperty(prop)) {
                    val += Number(item.channels[prop]);
                }
            }
            pieces.push({
                color: this.props.colors[numIndex],
                value: val
            });
            return (
                <div key={'person'+index}>
                    <Person
                        influencer={item}
                        color={this.props.colors[numIndex]}
                    />
                </div>


            );
        });
        console.log(this.props);
        return (

            <div className="row">
                <div className="col s12">
                    <div className="card-panel">
                        <div className="row">
                            <div className="col m4">
                                <h4>SEARCH STATS</h4>
                                <table className="search-stats">
                                    <thead></thead>
                                    <tbody>
                                    <tr>
                                        <td>
                                            <h6>Number of results:</h6>
                                        </td>
                                        <td>
                                            <h6 className="blue-text">{this.props.resultNum}</h6>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <h6>Total Exposures:</h6>
                                        </td>
                                        <td>
                                            <h6 className="blue-text">{this.props.exposures}</h6>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="col m5">
                                <h4>SELECTED</h4>
                                <Graph
                                    pieces={pieces}
                                    exposures={this.props.exposures}
                                />
                            </div>
                            <div className="col m3 selected-influencers grey-text text-darken-3">
                                <div className="collection">
                                    <h6 className="teal-text right-align collection-item">Influencers</h6>
                                    {selectedInfluencers}
                                </div>
                                <form ref="listForm"
                                      style={{display: 'none'}}
                                      onSubmit={this._createList.bind(this, this.props.selectedInfluencers)}>
                                    <InputText
                                        id="create"
                                        label="List Name"
                                        active
                                    />
                                    <button style={{padding: '0'}} type="button" className="btn-flat white red-text" onClick={this._toggleListCreate}>
                                        <i className="material-icons">clear</i>
                                    </button>
                                    <button style={{padding: '0'}} type="submit" className="btn-flat white green-text right">
                                        <i className="material-icons">done</i>
                                    </button>
                                    <div className="clearfix"></div>
                                </form>
                                {this.props.project && (this.props.selectedInfluencers.length !== 0) ?
                                <button
                                    type="submit" ref="listButton"
                                    className="btn-flat tiny white teal-text right"
                                    onClick={this.props.addInfluencers ? this.props.addInfluencers.bind(this, this.props.selectedInfluencers) : null}
                                    style={{padding: '0', fontSize: '12px'}}>
                                    <i className="material-icons right">add</i>Add to Project
                                </button> :
                                ((this.props.selectedInfluencers.length !== 0) && !this.props.projectInfluencers ?
                                <button
                                    type="submit" ref="listButton"
                                    className="btn-flat tiny white teal-text right"
                                    onClick={this._toggleListCreate}
                                    style={{padding: '0', fontSize: '12px'}}>
                                    <i className="material-icons right">add</i>Create List
                                </button> : null)}
                            </div>
                        </div>
                    </div>
                </div>
                {this.props.projectInfluencers ?
                    <div className="col s12 right-align">
                        <button
                            type="submit" ref="listButton"
                            className="btn-flat blue-grey lighten-2 white-text"
                            onClick={this.props.addInfl}
                            style={{padding: '0 15px', marginRight: '20px', fontSize: '12px'}}>
                            <i className="material-icons right">person_add</i>Add Influencers
                        </button>
                        <button
                            type="submit" ref="listButton"
                            className="btn-flat blue-grey lighten-2 white-text"
                            onClick={this.props.addList}
                            style={{padding: '0 15px', fontSize: '12px'}}>
                            <i className="material-icons right">playlist_add</i>Add a List
                        </button>
                    </div>: null}
            </div>
        );
    }
}

export default SelectedInfluencers;