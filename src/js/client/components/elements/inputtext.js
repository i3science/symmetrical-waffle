import React from 'react'; // eslint-disable-line no-unused-vars

const InputText = (props) => {
    if (!props.id) {
        return <div></div>;
    }
    if (props.prefix) {
        var prefix = <div
                className="prefix center-align"
                style={{ fontSize: '17px', marginTop: '8px'}}
            >{props.prefix}</div>;
    }
    if (props.suffix) {
        var suffix = <div
            className="suffix center-align"
            style={{ fontSize: '17px', marginTop: '8px'}}
        >{props.suffix}</div>;
    }
    return (
        <div className={'input-field col '+ (props.col ? props.col : 's12')}>
            {prefix || ''}
            <input
                type={props.type ? props.type : 'text'}
                id={props.id}
                name={props.label}
                className={props.class || ''}
                placeholder={props.placeholder ? props.placeholder : ''}
                value={props.val ? props.val : ''}
                onChange={props.onChange ? props.onChange.bind(this) : null}
            />
            {suffix || ''}
            <label
                htmlFor={props.id}
                className={((props.val || props.active) ? 'active ' : '') + (props.color ? props.color + '-text' : 'teal-text')}
            >{props.label}</label>
        </div>
    );
};

export default InputText;