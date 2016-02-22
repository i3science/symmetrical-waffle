import React from 'react';
import Actions from '../../../../actions/UiActions';
import clientStore from '../../../../stores/ClientStore';
import InputSelect from '../inputselect';

export default React.createClass({
	getInitialState: function() {
		return {
			clients: []
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

	render: function() {
		let options = {};
		this.state.clients.forEach((client) => {
			options[client._id] = client.name;
		});
		return (
			<InputSelect
				id={this.props.id}
				label={this.props.label}
				options={options}
				val={this.props.val}
				onChange={this.props.onChange.bind(this)} />
		);
	}
});