import React from 'react'; // eslint-disable-line no-unused-vars

const Breadcrumbs = (props) => {
    let paths = (props.path).split('/');
    String.prototype.capitalize = function(){
        return this.toLowerCase().replace( /\b\w/g, function (m) {
            return m.toUpperCase();
        });
    };
    var links = '';
    let breadcrumbs = paths.map((item, index) => {
        if (item) {
            links = links+'/'+item;
            return (
                <a key={index} href={links} className="breadcrumb">{item.capitalize()}</a>
            );
        }
    });
    return (
        <div>
            <a href='/' className="breadcrumb">Home</a>
            {breadcrumbs}
        </div>
    );
};

export default Breadcrumbs;