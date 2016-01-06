import React from 'react'; // eslint-disable-line no-unused-vars

const Input = (props) => {
    let label = () => {
        if (props.label) {
            return (
                <label htmlFor={props.name}>{props.label}</label>
            );
        }
    };
    return (
        <div>
            {label}
        <input
            type={props.type}

        />

        </div>
    );
};

export default Input;