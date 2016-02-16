import React from 'react'; // eslint-disable-line no-unused-vars
import CheckBox from '../../common/input/checkbox';
import _ from 'lodash';

var verticalsCollection = [
    {
        name: 'Design',
        verts: [
            {
                id: 'artculture',
                label: 'Art & Culture'
            },
            {
                id: 'fashion',
                label: 'Fashion'
            },
            {
                id: 'decor',
                label: 'Home Decor'
            }
        ]
    },
    {
        name: 'Technology',
        verts: [
            {
                id: 'gadgets',
                label: 'Gadgets'
            },
            {
                id: 'gaming',
                label: 'Gaming'
            },
            {
                id: 'cars',
                label: 'Cars'
            }
        ]
    },
    {
        name: 'Life & Love',
        verts: [
            {
                id: 'parenting',
                label: 'Parenting'
            },
            {
                id: 'travel',
                label: 'Travel'
            },
            {
                id: 'sexrelationships',
                label: 'Sex & Relationships'
            },
            {
                id: 'lifestyle',
                label: 'Lifestyle'
            }
        ]
    },
    {
        name: 'Body',
        verts: [
            {
                id: 'health',
                label: 'Health'
            },
            {
                id: 'beauty',
                label: 'Beauty'
            },
            {
                id: 'fitness',
                label: 'Fitness'
            },
            {
                id: 'food',
                label: 'Food'
            }
        ]
    }
];

const Verticals = (props) => {
    if (!props.verticals) {
        return <div></div>;
    }
    let verticals = verticalsCollection.map((item, index) => {
        let children = item.verts.map((child, cindex) => {
            let checked = '';
            let filterIndex = _.includes(props.verticals, child.label);
            if (filterIndex) {
                checked = 'checked';
            } else {
                checked = '';
            }

            if (props.minimal && !checked) {
                return <div></div>;
            } else {
                return (
                    <CheckBox
                        key={cindex}
                        id={child.id}
                        label={child.label}
                        parent={props.parent}
                        onChange={props.onChange}
                        checked={checked}
                    />
                );
            }
        });
        return (
            <div key={index} className={'col ' + (props.minimal ? 's12' : 's3')}>
                {props.minimal ? null :
                    <p className="teal-text">{item.name}</p>
                }
                {children}
            </div>
        );
    });
    return (
        <div className="row">
            {verticals}
        </div>
    );
};

export default Verticals;