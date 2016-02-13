import React from 'react'; // eslint-disable-line no-unused-vars
import Radio from '../../common/input/radio';

var projectTypeCollection = [
    {
        id: 'blogger',
        label: 'Blogger'
    },
    {
        id: 'vlogger',
        label: 'Vlogger'
    },
    {
        id: 'photo_blogger',
        label: 'Photo Blogger'
    },
    {
        id: 'amplifier',
        label: 'Amplifier'
    }
];

const ProjectType = (props) => {
    if (!props.val) {
        return <div></div>;
    }
    let projectType = projectTypeCollection.map(item => {
        return (
            <Radio
                key={item.id}
                id={item.id}
                name="projectType"
                label={item.label}
                parent={props.parent}
                onChange={props.onChange}
                checked={item.id === props.val}
            />
        );
    });
    return (
        <div className={props.minimal ? 'col s12' : ''}>
            {projectType}
        </div>
    );
};

export default ProjectType;