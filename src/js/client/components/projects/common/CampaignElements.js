import React from 'react';
import { Link } from 'react-router';
import CampaignElementActions from '../../../actions/CampaignElementActions';
import campaignElementStore from '../../../stores/CampaignElementStore';
import Card from '../../common/Card';
import CheckBox from '../../common/input/checkbox';

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


    render() {
        if (!this.state.elements) {
            return (<p>Loading campaign elements...</p>);
        }
        let renderElements = this.state.elements.map((el) => {
            console.log(el);
            return (
                <div className="col s2" key={el._id}>
                    <div className="card">
                        <div className="center-align teal white-text" style={{padding: '30px 10px'}}>
                            <i className="large material-icons">description</i>
                        </div>
                        <div style={{
                            padding: '10px',
                            borderTop: '1px solid rgba(0,0,0,0.1)'
                        }}>
                            <CheckBox
                                id={el._id}
                                label="Due Dec. 15"
                                style={{margin: '0 0 10px'}}
                                //onChange={props.onChange}
                                //checked={true}
                            />
                            <div style={{
                                fontSize: '18px',
                                lineHeight: '1'
                            }}>
                                <strong>
                                    <Link className="teal-text" to={'/projects/'+this.props.project._id+'/elements/'+el._id}>{el.name}</Link>
                                </strong>
                            </div>
                        </div>
                    </div>
                </div>
            );
        });
        return (
            <div className="row">
                {renderElements}
            </div>
        );
    }
}