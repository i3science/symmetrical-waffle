import React from 'react'; // eslint-disable-line no-unused-vars
import CheckBox from '../../common/input/checkbox';
import _ from 'lodash';
import verticalsCollection from '../../../../shared/verticals';

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