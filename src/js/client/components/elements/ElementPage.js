import React from 'react';
import moment from 'moment';
import CampaignElementActions from '../../actions/CampaignElementActions';
import HistoryActions from '../../actions/HistoryActions';
import campaignElementStore from '../../stores/CampaignElementStore';
import historyStore from '../../stores/HistoryStore';
import Card from '../common/Card';
import Tasks from './Tasks';
import Comments from './Comments';

export default class ElementPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            element: props.element || null,
            content: props.element ? props.element.content : null
        };
        this._onElementChange = this._onElementChange.bind(this);
        this._onHistoryChange = this._onHistoryChange.bind(this);
        this._onContentChange = this._onContentChange.bind(this);
        this._onSave = this._onSave.bind(this);
        this._onCancel = this._onCancel.bind(this);
    }

    componentDidMount() {
        if (!this.state.element) {
            campaignElementStore.addChangeListener(this._onElementChange);
            CampaignElementActions.findForProjectAndId(this.props.params.id, this.props.params.elementId);
        }
        historyStore.addChangeListener(this._onHistoryChange);
        HistoryActions.findForElement(this.props.params.id, this.props.params.elementId);
    }
    componentWillUnmount() {
        campaignElementStore.removeChangeListener(this._onElementChange);
        historyStore.removeChangeListener(this._onHistoryChange);
    }
    _onElementChange() {
        this.setState({
            element: campaignElementStore.getElement(),
            content: campaignElementStore.getElement().content
        });
    }
    _onHistoryChange() {
        this.setState({
            history: historyStore.getHistory()
        });
    }

    _onContentChange(ev) {
        this.setState({content: ev.target.value});
    }
    _onSave() {
        let element = this.state.element;
        element.content = this.state.content;
        CampaignElementActions.update(this.props.params.id, element);
        this.setState({edit: false});
    }
    _onCancel() {
        this.setState({
            edit: false,
            content: this.state.element.content
        });
    }
    getYoutubeId(url) {
        var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        var match = url.match(regExp);

        if (match && match[2].length == 11) {
            return match[2];
        }
        return false;
    }

    renderContent() {
        let content = this.state.content || this.state.element.content || '';

        if (this.state.element.type === 'blog') {
            if (this.state.edit) {
                return (
                    <div>
                        <textarea onChange={this._onContentChange} value={content} />
                        <button type="button" onClick={this._onSave}>Save</button>
                        <button type="button" onClick={this._onCancel}>Cancel</button>
                    </div>
                );
            }
            let tmp = content.split(/(\r\n|\n\r|\r|\n)/g).map((part, i) => {
                return (<p key={i}>{part}</p>);
            });
            return (
                <div>
                    <div>
                        {tmp}
                    </div>
                    <button type="button" onClick={() => {this.setState({edit:true});}}>Change</button>
                </div>
            );
        }
        if (this.state.element.type === 'vlog') {
            if (this.state.edit) {
                return (
                    <div>
                        <input onChange={this._onContentChange} value={content} />
                        <button type="button" onClick={this._onSave}>Save</button>
                        <button type="button" onClick={this._onCancel}>Cancel</button>
                    </div>
                );
            }

            let id = this.getYoutubeId(content);
            if (!id) {
                return (<div>Invalid Youtube video link: {content}</div>);
            }
            return (
                <div>
                    <div>
                    {<iframe width="560" height="315" src={'//www.youtube.com/embed/' + id} frameborder="0" allowfullscreen></iframe>}
                    </div>
                    <button type="button" onClick={() => {this.setState({edit:true});}}>Change</button>
                </div>
            );
        }
        return (<div>No content</div>);
    }

    renderHistory() {
        if (!this.state.history) {
            return (<div>Loading history...</div>);
        }

        return this.state.history.map((obj) => {
            return (
                <div key={obj._id}>
                    {obj.created_by.name.first} {obj.created_by.name.last} - {moment(obj.created_at).format('MMM DD, YYYY h:mma')}
                </div>
            );
        });
    }

    render() {
        if (!this.state.element) {
            return (
                <p>Loading element...</p>
            );
        }
        return (
            <div>
                <Tasks project={this.props.params.id} element={this.state.element} />

                <div className="row">
                    <div className="col s8">
                        <Card title={this.state.element.name}>
                            {this.renderContent()}
                        </Card>
                    </div>
                    <div className="col s4">
                        <Card title="Revision History">
                            {this.renderHistory()}
                        </Card>
                    </div>
                </div>

                <Comments project={this.props.params.id} element={this.state.element} />
            </div>
        );
    }
}