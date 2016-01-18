import React from 'react'; // eslint-disable-line no-unused-vars
import { Link } from 'react-router';
import _ from 'lodash';

class Breadcrumbs extends React.Component {
    constructor() {
        super();
    }

    render() {
        let routes = this.props.props.routes;
        routes.shift();
        let params = this.props.props.params;
        params = Object.prefixKeys(params, ':');

        let links = '';
        let breadcrumbs = routes.map(function(route, idx){
            links = '/' + _.trimLeft(links + '/' + (route.path || ''), '/');
            let name = route.name;
            if (!name) {
                return '';
            }
            
            return (
                <Link to={links} key={idx} className="breadcrumb">{name}</Link>
            );
        });
        return (
            <div>
                {breadcrumbs}
            </div>
        );
    }
}

export default Breadcrumbs;