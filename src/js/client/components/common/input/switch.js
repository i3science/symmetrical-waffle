import React from 'react'; // eslint-disable-line no-unused-vars

const Switch = (props) => {
    return (
        <div className="switch">
            <label style={{fontSize: '16px'}}>
                {props.label}
                <input
                    type="checkbox"
                    id={props.id}
                    name={props.label}
                    data-parent={props.parent || null}
                    checked={props.checked}
                    onChange={props.onChange ? props.onChange.bind(this) : null}
                />
                <span className="lever"></span>
            </label>
        </div>
    );
};

export default Switch;


