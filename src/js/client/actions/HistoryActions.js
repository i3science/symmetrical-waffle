import AppConstants from '../constants/constants';
import { dispatch } from '../dispatcher/dispatcher';
import historyService from '../services/HistoryService';

export default {
    findForEntity(type, id, children) {
        historyService
            .list(type, id, !!children)
            .then((history) => {
                dispatch({
                    actionType: AppConstants.GET_HISTORY,
                    history: history
                });
            });
    }
};