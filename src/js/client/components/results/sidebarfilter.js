import React from 'react'; // eslint-disable-line no-unused-vars
import Personal from '../search/components/personal';
import Audience from '../search/components/audience';

class SidebarFilter extends React.Component {
    render() {
        return (
            <div>
                <header className='teal lighten-1 white-text valign-wrapper' style={{height: '40px', marginBottom: '30px'}}>
                    <h6 style={{width: '100%'}} className="center-align">FILTERS</h6>
                </header>
                <div style={{padding: '0 10px 10px'}}>
                    {(!this.props.filters.type || (this.props.filters.type === 'influencer')) ?
                    <Personal
                        onChange={this.props.onChange}
                        personal={this.props.filters.personal}
                        verticals={this.props.filters.verticals}
                        mediums={this.props.filters.mediums}
                        children={this.props.filters.children}
                        channels={this.props.filters.channels}
                        minimal={true}
                        parent="personal"
                    /> :
                    <Audience
                        onChange={this.props.onChange}
                        audience={this.props.filters.audience}
                        verticals={this.props.filters.verticals}
                        mediums={this.props.filters.mediums}
                        children={this.props.filters.children}
                        minimal={true}
                        parent="audience"
                    />}
                </div>
            </div>
        );
    }
}

export default SidebarFilter;