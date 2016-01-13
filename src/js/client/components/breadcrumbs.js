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
        params = params.prefixKeys(':');

        let links = '';
        let breadcrumbs = routes.map(function(route, idx){
            // Handle index routes when the component comes up (next iter)
            if (!route.component && route.indexRoute === routes[idx+1]) {
                return;
            }
            // Whoops. Nothing to see here
            if (!route.component) {
                return;
            }
            let path = route.path;
            if (!route.path && route === routes[idx-1].indexRoute) {
                path = routes[idx-1].path;
            }
            links = '/' + _.trimLeft(links + '/' + (path || ''), '/');
            return (
                <Link to={links} key={idx} className="breadcrumb">{route.component.name()}</Link>
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