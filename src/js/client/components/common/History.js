import React from 'react';
import moment from 'moment';
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
        };
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
    render() {
        if (!this.state.history) {
            return (<p>Loading history...</p>);
        }
        let renderChildren = this.state.history.map((item) => {
            return (
                <div key={item._id} className="row">
                    <div className="col s3 right-align">{ moment(item.created_at).format('MMM DD, YYYY - h:mma') }</div>
                    <div className="col s9"><strong>{ item.created_by.name.first } { item.created_by.name.last }:</strong> { item.action } { item.eventable.type } { item.target }</div>
                </div>
            );
        });
        return (
            <div className="row">
                <div className="col s12">
                    {renderChildren}
                </div>
            </div>
        );
    }
}