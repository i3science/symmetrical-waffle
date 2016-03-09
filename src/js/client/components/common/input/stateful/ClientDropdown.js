import React from 'react';
import Actions from '../../../../actions/UiActions';
import clientStore from '../../../../stores/ClientStore';
import InputSelect from '../inputselect';
import InputText from '../inputtext';

export default React.createClass({
	getInitialState: function() {
		return {
			clients: [],
			other: null,
			typing: false
		};
	},

	propTypes: {
		id: React.PropTypes.string.isRequired,
		name: React.PropTypes.string,
		label: React.PropTypes.string.isRequired,
		val: React.PropTypes.string,
		onChange: React.PropTypes.func
	},

	componentWillMount: function() {
		clientStore.addChangeListener(this._onStoreChange);
		Actions.listClients();
	},

	componentWillUnmount: function() {
		clientStore.removeChangeListener(this._onStoreChange);
	},

	_onStoreChange: function() {
		this.setState({clients: clientStore.getClients()});
	},

	_onChange: function(ev) {
		if (ev.target.value === 'other') {
			this.setState({ typing: true });
			return;
		}
		this.props.onChange(ev);
	},

	_onOtherChange: function(ev) {
		this.setState({ other: ev.target.value });
		this.props.onChange(ev);
	},

	render: function() {
		if (this.state.typing) {
			return (
				<InputText id={this.props.id}
					label={this.props.label}
					value={this.state.other}
					onChange={this._onOtherChange}
					active={true} />
			);
		}


		let options = {};
		this.state.clients.forEach((client) => {
			options[client._id] = client.name;
		});
		options.other = 'Other';
		return (
			<InputSelect
				id={this.props.id}
				label={this.props.label}
				options={options}
				val={this.props.val}
				readOnly={this.props.readOnly}
				disabled={this.props.disabled}
				onChange={this._onChange} />
		);
	}
});