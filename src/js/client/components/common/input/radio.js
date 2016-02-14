import React from 'react'; // eslint-disable-line no-unused-vars

const Radio = (props) => {
    return (
        <p className={props.class || ''}>
            <input
                type="radio"
                id={props.id}
                name={props.name || props.label || props.id}
                data-parent={props.parent || null}
                checked={props.checked}
                className="filled-in"
                onChange={props.onChange.bind(this)}
            />
            <label htmlFor={props.id}>{props.label}</label>
        </p>
    );
};

export default Radio;