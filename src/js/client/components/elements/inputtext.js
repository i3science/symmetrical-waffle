import React from 'react'; // eslint-disable-line no-unused-vars

const InputText = (props) => {
    if (!props.id) {
        return <div></div>;
    }
    return (
        <div className={'input-field col '+ (props.col ? props.col : 's12')}>
            <input
                type={props.type ? props.type : 'text'}
                id={props.id}
                name={props.label}
                className="validate"
                placeholder={props.placeholder ? props.placeholder : ''}
                value={props.val ? props.val : ''}
                onChange={props.onChange ? props.onChange.bind(this) : null}
            />
            <label
                htmlFor={props.id}
                className={((props.val || props.active) ? 'active ' : '') + (props.color ? props.color + '-text' : 'teal-text')}
            >{props.label}</label>
        </div>
    );
};

export default InputText;