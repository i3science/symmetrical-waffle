import React from 'react';

class Verticals extends React.Component {
    render() {
        let verticals = this.props.verticals.map(item => {
            if (item.vertical) {
                return (
                    <div key={item.name} className="vertical chip white-text teal">{item.name} <i className="material-icons">check</i></div>
                );
            }

        });
        return (
            <div>
                {verticals}
            </div>
        );
    }
}

export default Verticals;