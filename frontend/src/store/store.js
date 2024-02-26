import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import {
	usersReducer,
	userReducer,
	postsReducer,
	postReducer,
	AppReducer,
} from './reducers';

export const reducer = combineReducers({
	users: usersReducer,
	user: userReducer,
	posts: postsReducer,
	post: postReducer,
	app: AppReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
