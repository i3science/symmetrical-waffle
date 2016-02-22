import React from 'react'; // eslint-disable-line no-unused-vars
import Header from './header/header';

class Template extends React.Component {
    render() {
        return (
            <div>
                <Header
                    props={this.props} />
                <div className="container section">
                    {this.props.children}
                </div>
            </div>
        );
    }
}
export default Template;