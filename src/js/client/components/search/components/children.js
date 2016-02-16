import React from 'react'; // eslint-disable-line no-unused-vars
import CheckBox from '../../common/input/checkbox';
import _ from 'lodash';

var childrenCollection = [
    {
        id: 'children_0',
        label: '< 1 year'
    },
    {
        id: 'children_1',
        label: '1-5 years'
    },
    {
        id: 'children_2',
        label: '6-12 years'
    },
    {
        id: 'children_3',
        label: '13-17 years'
    },
    {
        id: 'children_4',
        label: '18+ years'
    }
];

const Children = (props) => {
    if (!props.children) {
        return <div></div>;
    }
    let children = childrenCollection.map(item => {
        let checked = '';
        let filterIndex = _.includes(props.children, item.label);
        if (filterIndex) {
            checked = 'checked';
        } else {
            checked = '';
        }
        return (
            <div key={item.id} className={'col ' + (props.minimal ? 's12' : 's2')}>
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
                {children}
            </div>
        </div>
    );
};

export default Children;