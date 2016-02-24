import React from 'react';
import moment from 'moment';
import CommentActions from '../../actions/CommentActions';
import commentStore from '../../stores/CommentStore';
import Card from '../common/Card';
import InputTextArea from '../common/input/inputtextarea';

export default class Tasks extends React.Component {
    constructor() {
        super();
        this.state = {
            tasks: null
        };
        this._onStoreChange = this._onStoreChange.bind(this);
        this._onAddComment = this._onAddComment.bind(this);
    }

    componentWillMount() {
        commentStore.addChangeListener(this._onStoreChange);
        CommentActions.findForElement(this.props.project, this.props.element._id);
    }
    componentWillUnmount() {
        commentStore.removeChangeListener(this._onStoreChange);
    }
    _onStoreChange() {
        this.setState({
            comments: commentStore.getComments()
        });
    }

    _onAddComment(ev) {
        ev.preventDefault();
        let data = {
            text: ev.target[0].value
        };
        $('#common_text').val('');
        CommentActions.save(this.props.project, this.props.element._id, data);
    }

    renderComments() {

        return this.state.comments.map((comment) => {
            return (
                <div key={comment._id} style={{
                background: '#fff',
                marginBottom: '10px',
                padding: '10px 20px',
                borderBottomRightRadius: '30px',
                borderTopRightRadius: '30px',
                borderTopLeftRadius: '30px'
                }}>
                    <p><span className="teal-text">{comment.author.name.first} {comment.author.name.last}</span><br />
                        <span style={{fontSize: '12px'}}>{moment(comment.created).format('MMM DD, YYYY - h:mma')}</span></p>
                    <p style={{marginLeft: '20px'}}>{comment.text}</p>
                </div>
            );
        });
    }

    renderAdder() {
        return (
            <div>
                <form onSubmit={this._onAddComment} style={{borderTop: '4px solid rgba(0,0,0,0.3)', marginTop: '20px', paddingTop: '20px'}}>
                    <InputTextArea
                        id="common_text"
                        label="Add comment"
                        active
                    />
                    <div className="right-align">
                        <button
                            type="submit"
                            className="btn-flat blue-grey lighten-2 white-text"
                            style={{padding: '0 15px', fontSize: '12px'}}>
                            <i className="material-icons right">send</i>Send
                        </button>
                    </div>
                </form>
            </div>
        );
    }

    render() {
        if (!this.props.project
                || !this.props.element
                || typeof this.state.comments === 'undefined'
                || this.state.comments === null) {
            return (
                <Card>
                    <p>Loading comments...</p>
                </Card>
            );
        }
        return (
            <Card title="Chat Log">
                <div style={{background: 'rgba(0,0,0,0.05)', padding: '20px'}}>
                    {this.renderComments()}
                </div>
                {this.renderAdder()}
            </Card>
        );
    }
}