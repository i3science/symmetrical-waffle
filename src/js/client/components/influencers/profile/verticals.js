import React from 'react'; // eslint-disable-line no-unused-vars

const Verticals =(props) => {
    let verticals = props.verticals.map((item, index) => {
        return (
            <div key={index}
                className="vertical chip white-text teal"
            >{item} <i className="material-icons">check</i></div>
        );
    });
    return (
        <div>
            {verticals}
        </div>
    );
};

export default Verticals;