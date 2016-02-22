import React from 'react'; // eslint-disable-line no-unused-vars

const BlogItem = (props) => {
    return (
        <div className="valign-wrapper card-panel teal lighten-4 col s4" style={{height: props.itemsize + 'px', width: props.itemsize + 'px', margin: '0 20px 20px 0'}}>
            <p className="center-align teal-text" style={{width: '100%'}}><i className="material-icons" style={{marginBottom: '10px', fontSize: '100px'}}>description</i><br />{props.blog.name}</p>
        </div>
    );
};

const Work = (props) => {
    let blogs = props.work.map((item, index) => {
        return (
            <BlogItem
                key={index}
                itemsize={props.itemsize}
                blog={item}
            />
        );
    });
    return (
        <div className="row">
            {blogs}
        </div>
    );
};

export default Work;
