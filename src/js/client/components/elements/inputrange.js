import React from 'react'; // eslint-disable-line no-unused-vars
import InputText from './inputtext';

const InputRange = (props) => {
    if (!props.id) {
        return <div></div>;
    } else {
        console.log(props);
        return (
            <div className={'input-field col '+ (props.col ? props.col : 's12')}>
                <label
                    htmlFor={props.id}
                    className={'active ' + (props.color ? props.color + '-text' : 'teal-text')}
                >{props.label}</label>
                <input
                    type="range"
                    id={props.id}
                    min={props.min ? props.min : '0'}
                    max={props.max ? props.max : '100'}
                    value={props.val ? props.val : (props.max ? props.max/2 : 50)}
                    onChange={props.onChange ? props.onChange.bind(this) : null}
                />
                <div className="row">
                    <InputText
                        id="male"
                        label="Male"
                        value={props.val ? props.val : (props.max ? props.max/2 : 50)}
                        onChange={props.onChange ? props.onChange.bind(this) : null}
                    />
                </div>
            </div>
        );
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

export default InputRange;