import React from 'react';
import Verticals from './verticals';
import Personal from '../preferences/influencers/personal';
import Medium from '../preferences/influencers/medium';

class Filters extends React.Component {
    render() {
        return (
            <div className="card-panel">
                <h4>Search Criteria</h4>
                <h6 className="teal-text">I am looking for an influencer...</h6>
                <hr />

                <h5 className="teal-text">Personal</h5>
                <Personal
                    onChange={this.props.onChange}
                    personal={this.props.filters.personal}
                />
                <div className="row">
                    <h6 className="teal-text">Mediums</h6>
                    <Medium
                        onChange={this.props.onChange}
                        medium={this.props.filters.medium}
                    />
                </div>
                <hr />
                <h5 className="teal-text">Verticals</h5>
                <div className="row">
                    <Verticals
                        onChange={this.props.onChange}
                        verticals={this.props.filters.verticals}
                    />
                </div>
            </div>
        );
    }
}

export default Filters;