import React from 'react';
import { __ } from '../utils/i18n';

class Footer extends React.Component {
    render() {
        return (
            <footer className="valign-wrapper teal darken-4" style={{height: '60px', width: '100%', position: 'fixed', bottom: '0'}}>
                <p className="center-align grey-text text-lighten-2" style={{width: '100%'}}>{__('legal.privacy_policy')}  |  {__('legal:terms_and_conditions')}</p>
            </footer>
        );
    }
}

export default Footer;