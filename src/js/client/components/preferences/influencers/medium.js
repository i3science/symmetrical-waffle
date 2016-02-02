import React from 'react'; // eslint-disable-line no-unused-vars
import Form from '../../common/Form';
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
    if (!props.medium) {
        return <div></div>;
    }


    let medium = mediumCollection.map(item => {
        let checked = '';
        let filterIndex = _.contains(props.medium, item.label);
        if (filterIndex) {
            checked = 'checked';
        } else {
            checked = '';
        }
        return (
            <div key={item.id} className="col s3">
                <Form.CheckBox
                    key={item.id}
                    id={'medium_' + item.id}
                    name={item.label}
                    label={item.label}
                    onChange={props.onChange}
                    checked={checked}
                />
            </div>
        );
    });
    return (
        <div className="col s12">
            {medium}
        </div>
    );
};

export default Medium;