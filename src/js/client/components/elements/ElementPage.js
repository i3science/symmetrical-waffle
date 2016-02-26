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

class AddReport extends React.Component {
    constructor() {
        super();
        this.state = {
            item: {},
            edit: false
        };
        this._onChange = this._onChange.bind(this);
        this._cancel = this._cancel.bind(this);
        this._save = this._save.bind(this);
    }
    _onChange(type, event) {
        this.state.item[type] = event.target.value;
        this.setState({item: this.state.item});

    }
    _save() {
        this.props.onSave(this.props.name, this.state.item);
        this._cancel();

    }
    _cancel() {
        this.setState({
            edit: false,
            item: {}
        });
    }
    render() {
        return (
            <div className="row" style={{marginBottom: '0'}}>
                {this.state.edit ?
                <div>
                    <hr style={{marginBottom: '20px'}}/>
                    <div className="col s4">
                        <InputText
                            id={this.props.name + '_name'}
                            label="Report Name"
                            placeholder="eg. Page Views"
                            val={this.state.item.name || null}
                            onChange={this._onChange.bind(this, 'name')}
                            active
                        />

                    </div>
                    <div className="col s2">
                        <InputText
                            type="number"
                            id={this.props.name + '_number'}
                            label="Number"
                            val={this.state.item.number || null}
                            onChange={this._onChange.bind(this, 'number')}
                            active
                        />
                    </div>
                    <div className="col s6">
                        <InputText
                            id={this.props.name + '_link'}
                            label="Link to Post"
                            placeholder="eg. http://mysite.com/mypost"
                            val={this.state.item.link || null}
                            onChange={this._onChange.bind(this, 'link')}
                            active
                        />
                    </div>
                    <div className="col s12 right-align">
                        <button
                            className="btn-flat tiny white green-text"
                            type="button"
                            onClick={this._save}
                            style={{marginRight: '40px'}}>
                            <i className="material-icons right">save</i>
                            Save
                        </button>
                        <button
                            className="btn-flat tiny white red-text"
                            type="button"
                            onClick={this._cancel}>
                            <i className="material-icons right">clear</i>
                            Cancel
                        </button>
                    </div>
                </div> :
                <div className="col s12 right-align">
                    <hr style={{marginBottom: '20px'}}/>
                    <button
                        type="button"
                        className="btn-flat blue-grey lighten-2 white-text"
                        onClick={() => {this.setState({edit:true});}}
                        style={{padding: '0 15px', fontSize: '12px'}}>
                        <i className="material-icons right">add</i>Add Report
                    </button>
                </div>}
            </div>
        );
    }
}

const Reports = (props) => {
    let reports = props.reports.map((item, index) => {
        return (
            <div key={index} className="row reports" style={{marginBottom: '0', position: 'relative', paddingLeft: '20px'}}>
                <div className="col s4">
                    <p>{item.name}</p>
                </div>
                <div className="col s2">
                    <p>{item.number}</p>
                </div>
                <div className="col s6">
                    <p><a href={item.link} target="_blank">Link to site</a></p>
                </div>
                <button
                    style={{
                        padding: '0',
                        position: 'absolute',
                        top: '6px',
                        left: '5px'
                    }}
                    onClick={props.removeReport ? props.removeReport.bind(null, index, props.name) : null}
                    type="button"
                    className="btn-flat white red-text">
                    <i className="material-icons">clear</i>
                </button>
            </div>
        );
    });
    return (
        <div>{reports}</div>
    )
};

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
        this._removeReport = this._removeReport.bind(this);
        this._addReport = this._addReport.bind(this);
        this._onCancel = this._onCancel.bind(this);
        this._onSave = this._onSave.bind(this);
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
    showHistory(history) {
        return () => {
            this.setState({
                historical: (_.find(history.changes, { field: 'content' }) || {}).after || ' '
            });
        };
    }
    _addReport(type, returned) {
        this.state.element.reports[type].push(returned);
        this.setState({element: this.state.element});
        this._onSave();
    }
    _removeReport(index, type) {
        console.log(index, name);
        this.state.element.reports[type].splice(index, 1);
        this.setState({element: this.state.element});
        this._onSave();

        //this._onSave();
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
        let content = this.state.historical || this.state.content || this.state.element.content || '';

        let clearAndCancel = (
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
        );
        let saveButton = (
            <button
                type="button"
                className="btn-flat blue-grey lighten-2 white-text"
                onClick={() => {this.setState({edit:true});}}
                style={{padding: '0 15px', fontSize: '12px'}}>
                <i className="material-icons right">edit</i>Change
            </button>
        );
        if (this.state.historical) {
            saveButton = (
                <button
                        className="btn-flat tiny white red-text"
                        type="button"
                        onClick={() => {this.setState({historical:null});}}>
                    <i className="material-icons right">clear</i>
                    Back To Current
                </button>
            );
        }

        if (this.state.element.type === 'blog') {
            if (this.state.edit && !this.state.historical) {
                return (
                    <div className="">
                        <InputTextArea
                            id="blog_content"
                            val={content}
                            onChange={this._onContentChange}
                        />
                        {clearAndCancel}
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
                        {saveButton}
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
            if (this.state.edit && !this.state.historical) {
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
                        {clearAndCancel}
                    </div>
                );
            }
            return (
                <div>
                    <div style={{marginBottom: '20px', borderBottom: '1px solid rgba(0,0,0,0.1)'}}>
                    {_content}
                    </div>
                    <div className="right-align">
                        {saveButton}
                    </div>
                </div>
            );
        }
        if (this.state.element.type === 'photo') {
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
        let history = '';
        let self = this;
        if (this.state.history) {
            history = this.state.history.map((obj) => {
                return (
                    <li key={obj._id} className="collection-item" onClick={self.showHistory(obj)}>
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

                <Card title="Reports">
                    <div className="row">
                        <div className="col s6">
                            <h6>Halfway Report</h6>
                            {this.state.element.reports.half.length !== 0 ?
                            <Reports
                                name="half"
                                reports={this.state.element.reports.half}
                                removeReport={this._removeReport}
                            /> : null}

                        </div>
                        <div className="col s6">
                            <h6>End of Campaign Results</h6>
                            {this.state.element.reports.end.length !== 0 ?
                            <Reports
                                name="end"
                                reports={this.state.element.reports.end}
                                removeReport={this._removeReport}
                            /> : null}
                        </div>
                    </div>
                    <div className="row" style={{marginBottom: '0'}}>
                        <div className="col s6">
                            <AddReport
                                name="half"
                                onSave={this._addReport}
                            />
                        </div>
                        <div className="col s6">
                            <AddReport
                                name="eld"
                                onSave={this._addReport}
                            />
                        </div>
                    </div>
                </Card>
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