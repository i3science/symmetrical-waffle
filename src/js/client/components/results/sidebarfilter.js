import React from 'react'; // eslint-disable-line no-unused-vars

const SidebarFilter = () => {
    return (
        <div>
            <header className='teal lighten-4 white-text valign-wrapper' style={{height: '40px'}}>
                <h6 style={{width: '100%'}}><a data-activates="slide-out" className="button-collapse"><i className="mdi-navigation-menu"></i></a>FILTERS</h6>
            </header>
            <li><a href="#!">Testing</a></li>
            <li><a href="#!">Testing again</a></li>
            <li className="no-padding">
                <ul className="collapsible collapsible-accordion">
                    <li>
                        <a className="collapsible-header">Dropdown<i className="mdi-navigation-arrow-drop-down"></i></a>
                        <div className="collapsible-body">
                            <ul>
                                <li><a href="#!">First</a></li>
                                <li><a href="#!">Second</a></li>
                                <li><a href="#!">Third</a></li>
                                <li><a href="#!">Fourth</a></li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </li>
        </div>
    );
};

export default SidebarFilter;