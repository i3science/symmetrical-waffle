import React from 'react';

class Footer extends React.Component {
    render() {
        return (
            <footer className="valign-wrapper teal darken-4" style={{height: '60px', width: '100%', position: 'fixed', bottom: '0'}}>
                <p className="center-align grey-text text-lighten-2" style={{width: '100%'}}>Privacy Policy  |  Terms and Conditions</p>
            </footer>
        );
    }
}

export default Footer;