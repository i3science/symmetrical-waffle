import React from 'react';
import Actions from '../../../actions/UiActions';
import InfluencerStore from '../../../stores/InfluencerStore';
import InfluencerManageForm from './influencerManageForm';

class InfluencerEditPage extends React.Component {
    constructor() {
        super();
        this.state = {
            influencer: {
                name: {},
                personal: {},
                audience: {},
                verticals: [],
                mediums: [],
                children: [],
                channels: []
            }
        };
        this._onChange = this._onChange.bind(this);
        this._handleChange = this._handleChange.bind(this);
        this._onSubmit = this._onSubmit.bind(this);
        this._cancel = this._cancel.bind(this);
        this._expand = this._expand.bind(this);
    }

    componentWillMount() {
        
        this.setState({influencer: InfluencerStore.getInfluencerById(this.props.params.id)});
        InfluencerStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        InfluencerStore.removeChangeListener(this._onChange);
    }

    _onChange() {
        let currentInfluencer = InfluencerStore.getCurrentInfluencer();
        if (currentInfluencer) {
            this.setState({influencer: currentInfluencer});
        }
    }

    _handleChange(event) {
        console.log(event);

        let value = event.target.value;
        let id = event.target.id;
        if (id.indexOf('_range_') !== -1) {
            id = id.split('_')[0];
        }
        if (event.target.type === 'number') {
            value = Number(value);
        }
        if (event.target.type === 'checkbox') {
            let isIn = this.state.influencer[event.target.dataset.parent].indexOf(event.target.name);
            if ((isIn === -1) && value) {
                this.state.influencer[event.target.dataset.parent].push(event.target.name);
            } else {
                this.state.influencer[event.target.dataset.parent].splice(isIn, 1);
            }
        } else {
            if (!event.target.dataset.parent) {
                this.state.influencer[id] = value;
            } else {
                this.state.influencer[event.target.dataset.parent][id] = value;
            }
        }
        this.setState({influencer: this.state.influencer});
        console.log(this.state.influencer);
    }
    _cancel() {
        this.setState({influencer: {}});
        this.props.history.goBack();
    }

    _onSubmit(event) {
        event.preventDefault();
        if (!this.state.influencer._id) {
            Actions.createInfluencer(this.state.influencer);
        } else {
            Actions.updateInfluencer(this.state.influencer);
        }
    }

    _expand(event) {
        var advanced = document.getElementById('advanced-collapse');
        if (event.target.checked) {
            advanced.style.maxHeight = '1500px';
        } else {
            advanced.style.maxHeight = '0';
        }
    }

    render() {
        return (
            <div>
                <div className="card-panel z-depth-4">
                    <h4 className="center-align" style={{marginBottom: '30px'}}>Create an Influencer</h4>
                    <InfluencerManageForm
                        influencer={this.state.influencer}
                        expand={this._expand}
                        onChange={this._handleChange}
                        onSubmit={this._onSubmit}
                        cancel={this._cancel}
                    />
                </div>
            </div>
        );
    }

}
export default InfluencerEditPage;