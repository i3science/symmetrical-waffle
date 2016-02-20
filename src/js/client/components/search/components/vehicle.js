import React from 'react'; // eslint-disable-line no-unused-vars
import InputText from '../../common/input/inputtext';
import InputSelect from '../../common/input/inputselect';

const Vehicle = (props) => {
    if (!props.vehicle) {
        return <div></div>;
    }
    return (
        <div className="row">
            <div className={'col ' + (props.minimal ? 's12' : 's2')}>
                <InputText
                    id="year"
                    label="Vehicle Year"
                    val={props.vehicle.year}
                    parent={props.parent}
                    active
                    onChange={props.onChange}
                />
            </div>
            <div className={'col ' + (props.minimal ? 's12' : 's5')}>
                <InputText
                    id="make"
                    label="Vehicle Make"
                    val={props.vehicle.make}
                    parent={props.parent}
                    active
                    onChange={props.onChange}
                />
            </div>
            <div className={'col ' + (props.minimal ? 's12' : 's5')}>
                <InputText
                    id="model"
                    label="Vehicle Model"
                    val={props.vehicle.model}
                    parent={props.parent}
                    active
                    onChange={props.onChange}
                />
            </div>
        </div>
    );
};

export default Vehicle;