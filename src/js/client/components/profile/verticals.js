import React from 'react';

class Verticals extends React.Component {
    render() {
        let verticals = this.props.verticals.forEach(item => {
            return (
                <div key={item} className="vertical chip white-text teal">{item} <i className="material-icons">check</i></div>
            );

        });
        return (
            <div>
                {verticals}
            </div>
        );
    }
}

export default Verticals;