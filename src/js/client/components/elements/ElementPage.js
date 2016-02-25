import React from 'react';
import _ from 'lodash';
import moment from 'moment';
import CampaignElementActions from '../../actions/CampaignElementActions';
import HistoryActions from '../../actions/HistoryActions';
import campaignElementStore from '../../stores/CampaignElementStore';
import historyStore from '../../stores/HistoryStore';
import Card from '../common/Card';
import Tasks from './Tasks';
import Comments from './Comments';
import InputText from '../common/input/inputtext';
import InputTextArea from '../common/input/inputtextarea';

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
        CampaignElementActions.update(this.props.params.id, element)
            .then(() => {
                HistoryActions.findForElement(this.props.params.id, this.props.params.elementId);
            });
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
                    <div className="">
                        <InputTextArea
                            id="blog_content"
                            val={content}
                            onChange={this._onContentChange}
                        />
                        <div className="right-align">
                            <button
                                className="btn-flat tiny white green-text"
                                type="button"
                                onClick={this._onSave}
                                style={{marginRight: '40px'}}>
                                <i className="material-icons right">save</i>
                                Save
                            </button>
                            <button
                                className="btn-flat tiny white red-text"
                                type="button"
                                onClick={this._onCancel}>
                                <i className="material-icons right">clear</i>
                                Cancel
                            </button>
                        </div>
                    </div>
                );
            }
            let tmp = content.split(/(\r\n|\n\r|\r|\n)/g).map((part, i) => {
                return (<p key={i}>{part}</p>);
            });
            return (
                <div>
                    <div className="blog-content">
                        {tmp}
                    </div>
                    <div className="right-align">
                        <button
                            type="button"
                            className="btn-flat blue-grey lighten-2 white-text"
                            onClick={() => {this.setState({edit:true});}}
                            style={{padding: '0 15px', fontSize: '12px'}}>
                            <i className="material-icons right">edit</i>Change
                        </button>
                    </div>
                </div>
            );
        }
        if (this.state.element.type === 'vlog') {
            let id = this.getYoutubeId(content);
            let _content = null;
            if (!id) {
                _content = (<div>Invalid Youtube video link: {content}</div>);
            } else {
                _content = (
                    <div className="videobox">
                        <div className="videoWrapper">
                            <iframe
                                width="560"
                                height="315"
                                src={'//www.youtube.com/embed/' + id}
                                frameBorder="0"
                                allowFullScreen>
                            </iframe>
                        </div>
                    </div>
                );
            }
            if (this.state.edit) {
                return (
                    <div>
                        <div style={{marginBottom: '20px', borderBottom: '1px solid rgba(0,0,0,0.1)'}}>
                            {_content}
                        </div>
                        <InputText
                            id="vlog_content"
                            val={content}
                            onChange={this._onContentChange}
                        />
                        <div className="right-align">
                            <button
                                className="btn-flat tiny white green-text"
                                type="button"
                                onClick={this._onSave}
                                style={{marginRight: '40px'}}>
                                <i className="material-icons right">save</i>
                                Save
                            </button>
                            <button
                                className="btn-flat tiny white red-text"
                                type="button"
                                onClick={this._onCancel}>
                                <i className="material-icons right">clear</i>
                                Cancel
                            </button>
                        </div>
                    </div>
                );
            }
            return (
                <div>
                    <div style={{marginBottom: '20px', borderBottom: '1px solid rgba(0,0,0,0.1)'}}>
                    {_content}
                    </div>
                    <div className="right-align">
                        <button
                            type="button"
                            className="btn-flat blue-grey lighten-2 white-text"
                            onClick={() => {this.setState({edit:true});}}
                            style={{padding: '0 15px', fontSize: '12px'}}>
                            <i className="material-icons right">edit</i>Change
                        </button>
                    </div>
                </div>
            );
        }
        if (this.state.element.type === 'photo') {
            console.log(this.state.element);
            return (
                <div>
                    Images
                </div>
            );
        }
        return (<div>No content</div>);
    }


    render() {
        if (!this.state.element) {
            return (
                <p>Loading element...</p>
            );
        }
        console.log(this.state);
        let history = '';
        if (this.state.history) {
            history = this.state.history.map((obj) => {
                return (
                    <li key={obj._id} className="collection-item">
                        <span className="teal-text" style={{fontSize: '12px'}}>{obj.created_by.name.first} {obj.created_by.name.last}</span><br />
                        <div>{moment(obj.created_at).format('MMM DD, YYYY')}
                            <p className="secondary-content grey-text text-darken-2" style={{margin:'0'}}>
                                <strong>{moment(obj.created_at).format('h:mma')}</strong>
                            </p>
                        </div>
                    </li>
                );
            });

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
                            <ul className="collection">
                                {history}
                            </ul>
                        </Card>
                    </div>
                </div>

                <Comments project={this.props.params.id} element={this.state.element} />
            </div>
        );
    }
}