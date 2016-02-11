import React from 'react'; // eslint-disable-line no-unused-vars



const Radio = (props) => {
    return (
        <p className={props.class || ''}>
            <input
                type="checkbox"
                id={props.id}
                name={props.label}
                data-parent={props.parent || null}
                checked={props.checked}
                className="filled-in"
                onChange={props.onChange.bind(this)}
            />
            <label htmlFor={props.id}>{props.label}</label>
        </p>
    );
};

const Radios = (props) => {
    return (
        <p className={props.class || ''}>
            <input
                type="checkbox"
                id={props.id}
                name={props.label}
                data-parent={props.parent || null}
                checked={props.checked}
                className="filled-in"
                onChange={props.onChange.bind(this)}
            />
            <label htmlFor={props.id}>{props.label}</label>
        </p>
    );
};

export default Radios;