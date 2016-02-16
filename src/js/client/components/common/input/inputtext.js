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
            style={{ fontSize: '14px', marginTop: '8px', marginLeft: '10px', display: 'inline-block'}}
        >{props.suffix}</div>;
    }
    return (
        <div className="input-field row" style={{marginBottom: '0'}}>
            <div className="col s12">
            {prefix || ''}
            <input
                type={props.type ? props.type : 'text'}
                id={props.id}
                name={props.label}
                className={props.class || ''}
                placeholder={props.placeholder ? props.placeholder : ''}
                value={props.val ? props.val : ''}
                data-parent={props.parent || null}
                onChange={props.onChange ? props.onChange.bind(this) : null}
                style={props.style || null}
            />
            {suffix || ''}
            <label
                htmlFor={props.id}
                className={((props.val || props.active) ? 'active ' : '') + (props.color ? props.color + '-text' : 'teal-text')}
            >{props.label}</label>
                </div>
        </div>
    );
};

export default InputText;