import type {PayloadAction} from '@reduxjs/toolkit';
import type {Publication} from '../../types/types';

const selectedPublication: Publication = {body: '', title: '', date: 0, abstract: '', authors: []};
const initialState = {selectedPublication};

// Use the initialState as a default value
// eslint-disable-next-line @typescript-eslint/default-param-last
export default function searchReducer(state = initialState, action: PayloadAction) {
	// The reducer normally looks at the action type field to decide what happens
	switch (action.type) {
		// Do something here based on the different types of actions
		case 'search/publicationSelected': {
			// We need to return a new state object
			return {
				// That has all the existing state data
				...state,
				// But has a new array for the `todos` field
				selectedPublication: action.payload,
			};
		}

		default:
			// If this reducer doesn't recognize the action type, or doesn't
			// care about this specific action, return the existing state unchanged
			return state;
	}
}
