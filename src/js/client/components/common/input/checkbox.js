import React from 'react'; // eslint-disable-line no-unused-vars

const CheckBox = (props) => {
    return (
        <p className={props.class || ''} style={props.style || {}}>
            <input
                type="checkbox"
                id={props.id}
                name={props.label}
                data-parent={props.parent || null}
                checked={props.checked}
                className="filled-in"
                onChange={props.onChange}
            />
            <label htmlFor={props.id}>{props.label}</label>
        </p>
    );
};

export default CheckBox;