import React from 'react';
import { Link } from 'react-router';
import Actions from '../../../actions/UiActions';
import CampaignElementActions from '../../../actions/CampaignElementActions';
import campaignElementStore from '../../../stores/CampaignElementStore';
import Card from '../../common/Card';

export default class CampaignElements extends React.Component {
    constructor() {
        super();
        this.state = {
            elements: null
        };
        this._onElementsChange = this._onElementsChange.bind(this);
    }

    componentWillMount() {
        campaignElementStore.addChangeListener(this._onElementsChange);
        CampaignElementActions.findForProject(this.props.project);
    }

    componentWillUnmount() {
        campaignElementStore.removeChangeListener(this._onElementsChange);
    }

    _onElementsChange() {
        this.setState({ elements: campaignElementStore.getElements() });
    }

    renderElements() {
        return (
            <div className="row">
            {
                this.state.elements.map((el) => {
                    return (
                        <div className="col s2" key={el._id}>
                            <Card>
                                <div className="center-align">
                                    <i className="large material-icons">description</i>
                                </div>
                                <p className="center-align"><input type="checkbox" disabled="disabled"/> Due Dec. 15</p>
                                <p className="center-align"><strong><Link to={'/elements/'+el._id}>{el.name}</Link></strong></p>
                            </Card>
                        </div>
                    )
                })
            }
            </div>
        )
    }

    render() {
        if (!this.state.elements) {
            return (<Card title="Campaign Elements"><p>Loading campaign elements...</p></Card>);
        }
        console.log('Elements: ', this.state.elements);
        return (
            <Card title="Campaign Elements">
                {this.renderElements()}
            </Card>
        );
    }
}