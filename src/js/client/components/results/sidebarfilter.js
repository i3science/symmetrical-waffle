import React from 'react'; // eslint-disable-line no-unused-vars
import Filters from '../search/freeFormSearch/filters';

class SidebarFilter extends React.Component {
    render() {
        return (
            <div>
                <header className='teal lighten-1 white-text valign-wrapper' style={{height: '40px', marginBottom: '30px'}}>
                    <h6 style={{width: '100%'}} className="center-align">FILTERS</h6>
                </header>
                <div style={{padding: '0 10px 10px'}}>
                    <Filters
                        filters={this.props.filters}
                        onChange={this.props.onChange}
                        minimal
                    />
                </div>
            </div>
        );
    }
}

export default SidebarFilter;