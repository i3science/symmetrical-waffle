import React from 'react'; // eslint-disable-line no-unused-vars
import Verticals from '../search/verticals';
import Personal from '../preferences/influencers/personal';
import Medium from '../preferences/influencers/medium';

class SidebarFilter extends React.Component {
    render() {
        return (
            <div>
                <header className='teal lighten-2 white-text valign-wrapper' style={{height: '40px', marginBottom: '30px'}}>
                    <h6 style={{width: '100%'}}><a data-activates="slide-out" className="button-collapse"><i className="mdi-navigation-menu"></i></a>FILTERS</h6>
                </header>
                <Medium
                    onChange={this.props.onChange}
                    mediums={this.props.filters.mediums}
                    minimal={this.props.minimal || false}
                />
                <Personal
                    onChange={this.props.onChange}
                    personal={this.props.filters.personal}
                    minimal={this.props.minimal || false}
                />
                <Verticals
                    onChange={this.props.onChange}
                    verticals={this.props.filters.verticals}
                    minimal={this.props.minimal || false}
                />
            </div>
        );
    }
}

export default SidebarFilter;

//
//
//import React from 'react';
//import Verticals from './verticals';
//import Personal from '../preferences/influencers/personal';
//import Medium from '../preferences/influencers/medium';
//
//class Filters extends React.Component {
//    render() {
//        return (
//            <div>
//                <h4>Search Criteria</h4>
//                <h6 className="teal-text">I am looking for an influencer...</h6>
//                <hr />
//                <h5 className="teal-text">Personal</h5>
//                <Personal
//                    onChange={this.props.onChange}
//                    personal={this.props.filters.personal}
//                    minimal={this.props.minimal || false}
//                />
//                <div className="row">
//                    <h6 className="teal-text">Mediums</h6>
//                    <Medium
//                        onChange={this.props.onChange}
//                        mediums={this.props.filters.mediums}
//                        minimal={this.props.minimal || false}
//                    />
//                </div>
//                <hr />
//                <h5 className="teal-text">Verticals</h5>
//                <div className="row">
//                    <Verticals
//                        onChange={this.props.onChange}
//                        verticals={this.props.filters.verticals}
//                        minimal={this.props.minimal || false}
//                    />
//                </div>
//            </div>
//        );
//    }
//}
//
//export default Filters;