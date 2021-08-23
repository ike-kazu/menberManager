import * as Actions from './actions';
import initialState from '../store/initialState';

export const userReducer = (state = initialState.users, action) => {
    switch (action.type){
        case Actions.SIGN_IN:
            return {
                // 初期状態
                ...state,
                // 上書きされる
                ...action.payload
            }
        case Actions.SIGN_OUT:
            return {
                ...state,
            }
        default:
            return state
    }
}
