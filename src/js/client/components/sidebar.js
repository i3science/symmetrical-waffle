import React from 'react';
import influencerStore from '../stores/InfluencerStore';
import searchStore from '../stores/SearchStore';

class Sidebar extends React.Component {
    constructor() {
        super();
        this.state = {
            filters: searchStore.getFilters()
        };
        this._onChange = this._onChange.bind(this);
    }

    componentWillMount() {
        influencerStore.addChangeListener(this._onChange);
        searchStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        influencerStore.removeChangeListener(this._onChange);
        searchStore.removeChangeListener(this._onChange);
    }

    _onChange() {
        this.setState({filters: searchStore.getFilters()});
    }
    render() {
        let styling = '#main {padding-left: 240px;} @media only screen and (max-width : 992px) {#main {padding-left: 0;}}';
        return (
            <div>
                <style>
                    {styling}
                </style>
                <ul id="slide-out" className="side-nav fixed">
                    {this.props.children}
                </ul>
            </div>
        );
    }
}

export default Sidebar;