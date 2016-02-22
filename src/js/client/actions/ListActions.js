import AppConstants from '../constants/constants';
import { dispatch } from '../dispatcher/dispatcher';
import listService from '../services/ListService';

export default {
    refreshLists() {
        listService
            .list()
            .then((lists) => {
                dispatch({
                    actionType: AppConstants.REFRESH_LISTS,
                    lists: lists
                });
            });
    }
};