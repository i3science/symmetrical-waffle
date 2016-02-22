import React from 'react'; // eslint-disable-line no-unused-vars
import ListItem from './listitem';

const ListResults = (props) => {
    if (!props.lists) {
        return <div></div>;
    }
    let results = props.lists.map((item, index) => {
        return (
            <ListItem
                key={index}
                list={item}
                project={props.project || null}
                addList={props.addList}
            />
        );
    });
    return (
        <div className="">
            <div className="row">
                {results}
            </div>
        </div>
    );
};

export default ListResults;
