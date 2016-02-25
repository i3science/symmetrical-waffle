import React from 'react';
import CampaignElementActions from '../../actions/CampaignElementActions';
import campaignElementStore from '../../stores/CampaignElementStore';
import ElementPage from './ElementPage';

export default class InfluencerElementPage extends React.Component {
    constructor() {
        super();
        this.state = {
            element: null
        };
        this._onElementChange = this._onElementChange.bind(this);
    }

    componentWillMount() {
        campaignElementStore.addChangeListener(this._onElementChange);
        CampaignElementActions.findForProject(this.props.project._id || this.props.project);
    }
    componentWillUnmount() {
        campaignElementStore.removeChangeListener(this._onElementChange);
    }
    _onElementChange() {
        if (campaignElementStore.getElements().length > 0) {
            this.setState({
                element: campaignElementStore.getElements().shift()
            });
        }
    }

    render() {
        if (!this.state.element) {
            return (
                <p>Loading element...</p>
            );
        }
        let params = {
            id: this.props.project._id || this.props.project,
            elementId: this.state.element._id
        };
        return (
            <ElementPage element={this.state.element} params={params} />
        );
    }
}