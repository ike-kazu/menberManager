import {
    createStore as reduxCreateStore,
    combineReducers,
    applyMiddleware
} from 'redux';
import {groupsReducer} from '../groups/reducers';
import {userReducer} from '../users/reducers';
import { LoadingReducer } from '../loading/reducers';
import {connectRouter, routerMiddleware} from 'connected-react-router';
import thunk from 'redux-thunk';


// historyは前にいたルート
export default function createStore(history){
    return reduxCreateStore(
        combineReducers({
            router: connectRouter(history),
            groups: groupsReducer,
            users: userReducer,
            loading: LoadingReducer,
        }),
        applyMiddleware(
            routerMiddleware(history),
            thunk,
        )
    )
}