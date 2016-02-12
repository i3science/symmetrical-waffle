import React from 'react';
import moment from 'moment';
import CommentActions from '../../actions/CommentActions';
import commentStore from '../../stores/CommentStore';
import Card from '../common/Card';

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
        commentStore.removeChangeListener(this._onElementChange);
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
        CommentActions.save(this.props.project, this.props.element._id, data);
    }

    renderComments() {
        return this.state.comments.map((comment) => {
            return (
                <div key={comment._id}>
                    <p><strong>{comment.author.name.first} {comment.author.name.last} - {moment(comment.created).format('MMM DD, YYYY - h:mma')}</strong></p>
                    <p>{comment.text}</p>
                </div>
            );
        });
    }

    renderAdder() {
        return (
            <div>
                <form onSubmit={this._onAddComment}>
                    <textarea name="comment_text" id="comment_text"></textarea>
                    <div>
                        <input type="submit" value="Save"/>
                        <input type="reset" value="Cancel"/>
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
                {this.renderComments()}
                {this.renderAdder()}
            </Card>
        );
    }
}