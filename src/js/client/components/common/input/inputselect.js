import React from 'react'; // eslint-disable-line no-unused-vars

const InputSelect = (props) => {
    if (!props.id) {
        return <div></div>;
    }
    var selectOptions = null;
    if (props.options && Array.isArray(props.options)) {
        selectOptions = props.options.map(item => {
            return <option key={item} value={item}>{item}</option>;
        });
    }
    return (
        <div style={{
                borderBottom: '1px solid #9e9e9e',
                margin: '0 0 15px 0'
                }}>
            <label htmlFor={props.id} className={props.color ? props.color + '-text' : 'teal-text'}>{props.label}</label>
            <select
                id={props.id}
                name={props.label}
                className="browser-default"
                style={props.val ? {} : {color: 'rgba(0,0,0,0.23)', fontWeight: '500'}}
                defaultValue={props.val ? props.val : null}
                data-parent={props.parent || null}
                onChange={props.onChange ? props.onChange.bind(this) : null}>
                <option value="" disabled={props.placeholder ? 'disabled' : ''}>{props.placeholder ? props.placeholder : ''}</option>
                {selectOptions}
            </select>
        </div>
    );
};

export default InputSelect;