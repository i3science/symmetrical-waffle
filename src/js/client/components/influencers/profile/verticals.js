import React from 'react';

const Verticals =(props) => {
    let verticals = props.verticals.map(item => {
        return (
            <div key={item} className="vertical chip white-text teal">{item} <i className="material-icons">check</i></div>
        );
    });
    return (
        <div>
            {verticals}
        </div>
    );
};

export default Verticals;