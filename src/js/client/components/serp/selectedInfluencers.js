import React from 'react';
import { Link } from 'react-router';

class SelectedInfluencers extends React.Component {
    render() {
        let selectedInfluencers = this.props.selectedInfluencers.map(item => {
            return (
                <div key={item.id}>{item.name.first} {item.name.last}</div>
            )
        });
        return (
            <div className="row">
                {selectedInfluencers}
            </div>
        );
    }
}

export default SelectedInfluencers;