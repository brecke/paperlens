// Import {combineReducers} from 'redux';
import {combineReducers} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import type {Publication} from './types/types';
import searchReducer from './features/search/search-slice';

const rootReducer = combineReducers({
	/**
	 * Define a top-level state field named `search`, handled by `searchReducer`
	 * Remember the key names you give to combineReducers decides what the
	 * key names of your state object will be!
	 */
	search: searchReducer,
});

export default rootReducer;
