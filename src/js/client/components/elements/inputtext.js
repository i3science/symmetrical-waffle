import React from 'react'; // eslint-disable-line no-unused-vars

const InputText = (props) => {
    return (
        <div className="input-field">
            <input type="text" id={props.id} className="validate" value={props.val} onChange={props.onChange.bind(this, props.id)}/>
            <label htmlFor={props.id} className={props.val ? 'active' : ''}>{props.label}</label>
        </div>
    );
};

export default InputText;