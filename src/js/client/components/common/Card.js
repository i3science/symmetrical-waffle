import React from 'react'; // eslint-disable-line no-unused-vars

export default (props) => {
    return (
        <div className={'card-panel' + (props.deep ? ' z-depth-4' : '')}>
            { props.title && (
                <div>
                    <h5 className="grey-text text-darken-2" style={{marginTop: '0'}}>{ props.title }</h5>
                    <div className="row" style={{marginBottom: '0'}}><hr style={{marginTop: '20px'}}/></div>
                </div>
            )}
            { props.children }
        </div>
    );
};