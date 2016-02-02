import React from 'react';
import Actions from '../../../actions/UiActions';
import InfluencerStore from '../../../stores/InfluencerStore';
import InfluencerManageForm from './influencerManageForm';

class InfluencerCreatePage extends React.Component {
    constructor() {
        super();
        this.state = {
            influencer: {
                name: {},
                personal: {},
                audience: {},
                verticals: []
            }

        };
        this._onChange = this._onChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this._onSubmit = this._onSubmit.bind(this);
        this._cancel = this._cancel.bind(this);
        this._expand = this._expand.bind(this);
    }

    componentWillMount() {
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

    handleChange(event) {
        var value = event.target.value;
        if (event.target.id.indexOf('_') > -1) {
            let drill = event.target.id.split('_');
            var category = drill[0];
            var item = drill[1];
        } else {
            item = event.target.id;
        }
        if (event.target.type === 'checkbox') {
            value = (event.target.checked === true);
        }
        if (category) {
            if (category === 'verticals') {
                var isIn = this.state.influencer[category].indexOf(event.target.name);
                if ((isIn === -1) && value) {
                    this.state.influencer[category].push(event.target.name);
                } else {
                    this.state.influencer[category].splice(isIn, 1);
                }
            } else {
                this.state.influencer[category][item] = value;
            }
        } else {
            this.state.influencer[item] = value;
        }
        this.setState({influencer: this.state.influencer});
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
            advanced.style.maxHeight = '1000px';
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
                        onChange={this.handleChange}
                        onSubmit={this._onSubmit}
                        cancel={this._cancel} />
                </div>
            </div>
        );
    }

}
export default InfluencerCreatePage;