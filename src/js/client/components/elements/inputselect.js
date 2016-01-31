import React from 'react'; // eslint-disable-line no-unused-vars

const InputSelect = (props) => {
    if (!props.id) {
        return <div></div>;
    }
    let selectOptions = props.options.map(item => {
        return <option key={item} value={item}>{item}</option>;
    });
    return (
        <div className={'col '+ (props.col ? props.col : 's12')}>

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
                    defaultValue={props.val ? props.val : ''}
                    onChange={props.onChange.bind(this)}>
                    <option value="" disabled>{props.placeholder ? props.placeholder : ''}</option>
                    {selectOptions}
                </select>
            </div>
        </div>
    );
};

export default InputSelect;