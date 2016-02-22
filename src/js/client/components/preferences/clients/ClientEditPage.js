import React from 'react';
import Actions from '../../../actions/UiActions';
import representativeStore from '../../../stores/RepresentativeStore';
import ClientEditForm from './ClientEditForm';

class ClientEditPage extends React.Component {
    constructor() {
        super();
        this.state = {
            representative: {
                name: {}
            }
        };
        this._onChange = this._onChange.bind(this);
        this._handleChange = this._handleChange.bind(this);
        this._onSubmit = this._onSubmit.bind(this);
        this._cancel = this._cancel.bind(this);
        this._expand = this._expand.bind(this);
    }

    componentDidMount() {
        if (this.props.params.clientId) {
            representativeStore.addChangeListener(this._onChange);
            Actions.findRepresentative(this.props.params.clientId);
        }
    }

    componentWillUnmount() {
        representativeStore.removeChangeListener(this._onChange);
    }

    _onChange() {
        let currentRep = representativeStore.getCurrentRepresentative();
        if (currentRep) {
            this.setState({representative: currentRep});
        }
    }

    _handleChange(event) {
        let value = event.target.value;
        let id = event.target.id;
        if (id.indexOf('_range_') !== -1) {
            id = id.split('_')[0];
        }
        if (event.target.type === 'number') {
            value = Number(value);
        }
        if (event.target.type === 'checkbox') {
            let isIn = this.state.representative[event.target.dataset.parent].indexOf(event.target.name);
            if ((isIn === -1) && value) {
                this.state.representative[event.target.dataset.parent].push(event.target.name);
            } else {
                this.state.representative[event.target.dataset.parent].splice(isIn, 1);
            }
        } else {
            if (!event.target.dataset.parent) {
                this.state.representative[id] = value;
            } else {
                this.state.representative[event.target.dataset.parent][id] = value;
            }
        }
        this.setState({representative: this.state.representative});
    }
    _cancel() {
        this.setState({influencer: {}});
        this.props.history.goBack();
    }

    _onSubmit(event) {
        event.preventDefault();
        let self = this;
        if (!this.state.representative._id) {
            Actions.createRepresentative(this.state.representative)
                .then((rep) => {
                    Materialize.toast('Successfully created new client rep!', 4000); // eslint-disable-line no-undef
                    self.props.history.pushState(null, '/preferences/clients/'+rep._id+'/edit');
                })
                .fail((err) => {
                    console.error('Err: ', err); // eslint-disable-line no-console
                });
        } else {
            Actions.updateRepresentative(this.state.representative)
                .then(() => {
                    Materialize.toast('Successfully updated client rep!', 4000); // eslint-disable-line no-undef
                });
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
        if (!this.state.representative) {
            return (<div>Loading representative...</div>);
        }
        return (
            <div>
                <div className="card-panel z-depth-4">
                    <h4 className="center-align" style={{marginBottom: '30px'}}>Create an Client</h4>
                    <ClientEditForm
                        representative={this.state.representative}
                        onChange={this._handleChange}
                        onSubmit={this._onSubmit}
                        cancel={this._cancel}
                    />
                </div>
            </div>
        );
    }

}
export default ClientEditPage;