import React from 'react';
import CampaignElementActions from '../../actions/CampaignElementActions';
import campaignElementStore from '../../stores/CampaignElementStore';
import Card from '../common/Card';
import Tasks from './Tasks';
import Comments from './Comments';

export default class ElementPage extends React.Component {
    constructor() {
        super();
        this.state = {
            element: null,
            content: null
        };
        this._onElementChange = this._onElementChange.bind(this);
        this._onContentChange = this._onContentChange.bind(this);
        this._onSave = this._onSave.bind(this);
        this._onCancel = this._onCancel.bind(this);
    }

    componentWillMount() {
        campaignElementStore.addChangeListener(this._onElementChange);
        CampaignElementActions.findForProjectAndId(this.props.params.id, this.props.params.elementId);
    }
    componentWillUnmount() {
        campaignElementStore.removeChangeListener(this._onElementChange);
    }
    _onElementChange() {
        this.setState({
            element: campaignElementStore.getElement(),
            content: campaignElementStore.getElement().content
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
            return (
                <div>
                    <div>
                    {content.replace(/(\r\n|\n\r|\r|\n)/g, '<br/>')}
                    </div>
                    <button type="button" onClick={() => {this.setState({edit:true})}}>Change</button>
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
                    <button type="button" onClick={() => {this.setState({edit:true})}}>Change</button>
                </div>
            )
        }
        return (<div>No content</div>);
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

                        </Card>
                    </div>
                </div>

                <Comments project={this.props.params.id} element={this.state.element} />
            </div>
        );
    }
}