import React from 'react'; // eslint-disable-line no-unused-vars
import ListResult from './listresults';

const ListResults = (props) => {
    let results = props.lists.map((item, index) => {
        return (
            <ListResult key={index}
                        list={item}
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
