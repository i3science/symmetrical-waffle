import React from 'react';

export default (props) => {
    let classes = ['card-panel'];
    if (props.deep) {
        classes.push('z-depth-4');
    }
    return (
        <div className={classes}>
            { props.title && (<h5 className="grey-text text-darken-2" style={{marginBottom: '30px'}}>{ props.title }</h5>) }
            { props.children }
        </div>
    );
}