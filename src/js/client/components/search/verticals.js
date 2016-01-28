import React from 'react'; // eslint-disable-line no-unused-vars
import CheckBox from '../elements/checkbox';
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

    let verticals = verticalsCollection.map(item => {
        let children = item.verts.map(child => {
            let checked = '';
            let filterIndex = _.contains(props.verticals, child.label);
            if (filterIndex) {
                checked = 'checked';
            } else {
                checked = '';
            }
            return (
                <CheckBox
                    key={child.id}
                    id={'verticals_' + child.id}
                    label={child.label}
                    onChange={props.onChange}
                    checked={checked}
                />
            );
        });
        return (
            <div key={item.name} className="col s3">
                <h6 className="teal-text">{item.name}</h6>
                {children}
            </div>
        );
    });
    return (
        <div className="col s12">
            {verticals}
        </div>
    );
};

export default Verticals;