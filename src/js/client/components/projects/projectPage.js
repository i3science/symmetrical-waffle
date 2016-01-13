import React from 'react';
import { Link } from 'react-router';
import AppStore from '../../stores/UiStore';
import Actions from '../../actions/UiActions';

/*

project object:
advertiser
project name
amplifiers
live date

 */

const Result = (props) => {
    //console.log(props.project.advertiser);
    return (
        <div className="col m3 s2">
            <div className="card">
                <div className="card-content">
                    <span className="card-title teal-text text-darken-1">{props.project.advertiser}</span>
                    <p><strong>{props.project.name}</strong></p>
                    <p>Amplifiers: {props.project.amplifiers}</p>
                    <p>Live Date: {props.project.start}</p>
                </div>
                <div className="card-action">
                    <a href="#">More Info...</a>
                </div>
            </div>
        </div>
    );
};

const Results = (props) => {
    let results = props.projects.map((item, index) => {
        return (
            <Result key={index}
                project={item}
            />
        );
    });

    return (
        <div className="card-panel">
            <div className="row">
                {results}
                <div className="col m3 s2">
                    <div className="card">
                        <div className="card-content">
                            <span className="card-title teal-text text-darken-1">Ford</span>
                            <p><strong>Ford Thanksgiving</strong></p>
                            <p>Amplifiers: 123456</p>
                            <p>Live Date: 11.15.15</p>
                        </div>
                        <div className="card-action">
                            <a href="#">More Info...</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

class Serp extends React.Component {
    constructor() {
        var project = {
            advertiser: 'Ford',
            name: 'Ford Thanksgiving',
            amplifiers: 300,
            start: 112015
        };

        super();
        this.state = {
            //projectResults: AppStore.getAllInfluencers()
            projectResults: [
                project,
                project,
                project,
                project,
                project,
                project,
                project,
                project,
                project,
                project
            ]
        };
        this._onChange = this._onChange.bind(this);
    }

    componentWillMount() {
        AppStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        AppStore.removeChangeListener(this._onChange);
    }

    _onChange() {
        this.setState({
            projects: AppStore.getAllInfluencers()
        });
    }

    addToList(pass, event) {
        event.preventDefault();
        Actions.addInfluencerToList(pass);
    }

    render() {
        return (
            <div>
                <Link to="/search" className="btn">Results</Link>
                <Results
                    projects={this.state.projectResults}
                />

            </div>
        );
    }
}

export default Serp;