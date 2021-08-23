import * as Action from './actions';
import initialState from '../store/initialState';

export const groupsReducer = (state = initialState.groups, action) => {
    switch (action.type){
        case Action.DELETE_GROUP:
            return {
                ...state,
            }
        case Action.FETCH_GROUP:
            return {
                ...initialState.groups,
                ...action.payload
            }
        default:
            return state
    }
}
