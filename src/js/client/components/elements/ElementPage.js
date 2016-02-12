import React from 'react';
import CampaignElementActions from '../../actions/CampaignElementActions';
import campaignElementStore from '../../stores/CampaignElementStore';
import Card from '../common/Card';
import Tasks from './Tasks';
import Comments from './Comments';

export default class ElementPage extends React.Component {
    constructor() {
        super();
        this.state = {
            element: null
        };
        this._onElementChange = this._onElementChange.bind(this);
    }

    componentWillMount() {
        campaignElementStore.addChangeListener(this._onElementChange);
        CampaignElementActions.findForProjectAndId(this.props.params.id, this.props.params.elementId);
    }
    componentWillUnmount() {
        campaignElementStore.removeChangeListener(this._onElementChange);
    }
    _onElementChange() {
        this.setState({ element: campaignElementStore.getElement() });
    }

    renderElementContent() {
        return (
            <div className="row">
                <div className="col s8">
                    <Card title={this.state.element.name}>
                        Sara Blog Article
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </Card>
                </div>
                <div className="col s4">
                    <Card title="Revision History">

                    </Card>
                </div>
            </div>
        );
    }

    render() {
        if (!this.state.element) {
            return (
                <Card>
                    <p>Loading element...</p>
                </Card>
            );
        }
        return (
            <div>
                <Tasks project={this.props.params.id} element={this.state.element} />

                {this.renderElementContent()}

                <Comments project={this.props.params.id} element={this.state.element} />
            </div>
        );
    }
}