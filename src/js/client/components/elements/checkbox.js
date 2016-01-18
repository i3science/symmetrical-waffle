import React from 'react'; // eslint-disable-line no-unused-vars

const CheckBox = (props) => {
    return (
        <p>
            <input type="checkbox" id={props.id} checked={props.checked} className="filled-in" onChange={props.onChange.bind(this)}/>
            <label htmlFor={props.id}>{props.label}</label>
        </p>
    );
};

export default CheckBox;