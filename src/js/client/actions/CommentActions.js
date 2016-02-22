import AppConstants from '../constants/constants';
import { dispatch } from '../dispatcher/dispatcher';
import commentService from '../services/CommentService';

export default {
    findForElement(project, element) {
        commentService
            .list(project, element._id || element)
            .then((comments) => {
                dispatch({
                    actionType: AppConstants.REFRESH_COMMENTS,
                    comments: comments
                });
            });
    },
    save(project, element, comment) {
        let self = this;
        if (comment._id) {
            return commentService
                .update(project, element, comment)
                .then(() => {
                    self.findForElement(project, element);
                    return true;
                });
        } else {
            return commentService
                .create(project, element, comment)
                .then(() => {
                    self.findForElement(project, element);
                    return true;
                });
        }
    }
};