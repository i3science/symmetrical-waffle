import React from 'react'; // eslint-disable-line no-unused-vars

const InputTextArea = (props) => {
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
        <div className="input-field row" style={{marginBottom: '0'}}>
            <div className="col s12">
                {prefix || ''}
                <textarea
                    type={props.type ? props.type : 'text'}
                    id={props.id}
                    name={props.label}
                    className={(props.class || '') + ' materialize-textarea'}
                    placeholder={props.placeholder ? props.placeholder : ''}
                    value={props.val ? props.val : null}
                    data-parent={props.parent || null}
                    disabled={props.disabled}
                    onChange={props.onChange ? props.onChange.bind(this) : null}>
                </textarea>
                {suffix || ''}
                <label
                    htmlFor={props.id}
                    className={((props.val || props.active) ? 'active ' : '') + (props.color ? props.color + '-text' : 'teal-text')}
                >{props.label}</label>
            </div>
        </div>
    );
};

export default InputTextArea;