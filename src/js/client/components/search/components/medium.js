import React from 'react'; // eslint-disable-line no-unused-vars
import CheckBox from '../../common/input/checkbox';
import _ from 'lodash';

var mediumCollection = [
    {
        id: 'blogger',
        label: 'Blogger'
    },
    {
        id: 'vlogger',
        label: 'Vlogger'
    },
    {
        id: 'photoblogger',
        label: 'Photo Blogger'
    },
    {
        id: 'amplifier',
        label: 'Amplifier'
    }
];

const Medium = (props) => {
    if (!props.mediums) {
        return <div></div>;
    }
    let mediums = mediumCollection.map(item => {
        let checked = '';
        let filterIndex = _.includes(props.mediums, item.label);
        if (filterIndex) {
            checked = 'checked';
        } else {
            checked = '';
        }
        return (
            <div key={item.id} className={'col ' + (props.minimal ? 's12' : 's3')}>
                {props.minimal && !checked ? null :
                <CheckBox
                    id={item.id}
                    label={item.label}
                    parent={props.parent}
                    onChange={props.onChange}
                    checked={checked}
                />}
            </div>
        );
    });
    return (
        <div className="row">
            <div className={props.minimal ? 'col s12' : ''}>
                {mediums}
            </div>
        </div>
    );
};

export default Medium;