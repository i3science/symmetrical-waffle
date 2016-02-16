import React from 'react';
import Personal from '../components/personal';
import Medium from '../components/medium';
import Children from '../components/children';

class Filters extends React.Component {
    render() {
        return (
            <div>
                <h4>Search Criteria</h4>
                <h6 className="teal-text">I am looking for an influencer...</h6>
                <hr />
                <h5 className="teal-text">Personal</h5>
                <Personal
                    onChange={this.props.onChange}
                    personal={this.props.filters.personal}
                    verticals={this.props.filters.verticals}
                    parent="personal"
                    minimal={this.props.minimal || false}
                />
                <h6 className="teal-text">Children</h6>
                <Children
                    onChange={this.props.onChange}
                    children={this.props.filters.children}
                    parent="children"
                    minimal={this.props.minimal || false}
                />
                <h6 className="teal-text">Mediums</h6>
                <Medium
                    onChange={this.props.onChange}
                    mediums={this.props.filters.mediums}
                    parent="mediums"
                    minimal={this.props.minimal || false}
                />
                <hr />
                <h5 className="teal-text">Verticals</h5>

            </div>
        );
    }
}

export default Filters;