import React from 'react';
import moment from 'moment';
import Actions from '../../actions/UiActions';
import historyStore from '../../stores/HistoryStore';
import HistoryActions from '../../actions/HistoryActions';

/**
 * The History component is responsible for retrieving and rendering a series
 * of auditing records for a given entity or set of entities.
 */
export default class History extends React.Component {
    constructor() {
        super();
        this.state = {
            history: null
        }
        this._onHistoryChange = this._onHistoryChange.bind(this);
    }
    componentWillMount() {
        historyStore.addChangeListener(this._onHistoryChange);
        HistoryActions.findForEntity(this.props.type, this.props.id, !!this.props.children);
    }
    componentWillUnmount() {
        historyStore.addChangeListener(this._onHistoryChange);
    }
    _onHistoryChange() {
        this.setState({ history: historyStore.getHistory() });
    }


    renderChildren() {
        return this.state.history.map((item) => {
            return (
                <tr>
                    <td className="right-align">{ moment(item.created_at).format('DD-MMM-YYYY') }</td>
                    <td><strong>{ item.created_by.name.first } { item.created_by.name.last }:</strong> { item.action } { item.eventable.type } { item.target }</td>
                </tr>
            );
        });
    }
    render() {
        if (!this.state.history) {
            return (<p>Loading history...</p>);
        }
        return (
            <table style={{borderWidth: 0}}>
                { this.renderChildren() }
            </table>
        );
    }
}