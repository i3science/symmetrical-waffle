import React from 'react';
import { Link } from 'react-router';

const Graph = (props) => {
    var selectedExposures = 0;
    let pieces = props.pieces.map((item,index) => {
        selectedExposures += item.value;
        let gwidth = item.value/props.exposures*100;
        return (
            <div key={index} style={{width:gwidth+'%',background:item.color,height:'100%',display:'inline-block'}}>
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
        <div key={props.influencer.id} className="collection-item">
            <Link to={'/profile/'+props.influencer.id} className="grey-text text-darken-2">{props.influencer.name.first}
                <i className="secondary-content small material-icons" style={{color:props.color}}>account_circle</i>
            </Link>
            <br />
        </div>
    );

};

class SelectedInfluencers extends React.Component {
    render() {
        var pieces = [];
        var reach = 0;
        var selectedInfluencers = this.props.selectedInfluencers.map((item,index) => {
            var numIndex = String(index);

            if (numIndex.length > 1) {
                numIndex = Number(numIndex.substr(numIndex.length - 1));
            }
            let val = Number();
            reach = item.reach.map(i => {
                val += i.value;
            });
            pieces.push({
                color: this.props.colors[numIndex],
                value: val
            });
            return (
                <Person
                    key={item.id}
                    influencer={item}
                    color={this.props.colors[numIndex]}
                />
            );
        });
        return (
            <div className="row">
                <div className="col s11">
                    <div className="card-panel">
                        <div className="row">
                            <div className="col s4">
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
                            <div className="col s5">
                                <h4>SELECTED</h4>
                                <Graph
                                    pieces={pieces}
                                    exposures={this.props.exposures}
                                />
                            </div>
                            <div className="col s3 selected-influencers grey-text text-darken-3">

                                <div className="collection">
                                    <h6 className="teal-text right-align collection-item">Influencers</h6>
                                    {selectedInfluencers}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SelectedInfluencers;