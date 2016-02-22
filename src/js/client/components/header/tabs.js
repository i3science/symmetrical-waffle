import React from 'react'; // eslint-disable-line no-unused-vars
import _ from 'lodash';

const Tabs = (props) => {
    let tabsData = [
        {label: 'SEARCH', link: '/search'},
        {label: 'PROJECTS', link: '/projects'},
        {label: 'LISTS', link: '/lists'}
    ];
    let tabs = tabsData.map(item => {
        var active = _.findIndex(props.routes, function(each){
            return each.path === item.label.toLowerCase();
        });
        if (active < 0) {
            active = '';
        } else {
            active = ' active';
        }
        return (
            <li key={item.label} className="tab col s3"><a className={'teal-text' + active} data-href={item.link} onClick={props.onClick}>{item.label}</a></li>
        );

    });
    return (
        <ul className="tabs">
            {tabs}
        </ul>
    );
};

export default Tabs;