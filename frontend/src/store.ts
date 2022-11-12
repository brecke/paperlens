import {configureStore, applyMiddleware} from '@reduxjs/toolkit';
import {composeWithDevTools} from 'redux-devtools-extension';
import reducer from './reducer';

const alwaysReturnHelloMiddleware = storeAPI => next => action => {
	const originalResult = next(action);
	// Ignore the original result, return something else
	return 'Hello!';
};

const composedEnhancer = composeWithDevTools(
	// EXAMPLE: Add whatever middleware you actually want to use here
	applyMiddleware(alwaysReturnHelloMiddleware),
	// Other store enhancers if any
);

const store = configureStore({
	reducer,
	// Middleware: composedEnhancer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
