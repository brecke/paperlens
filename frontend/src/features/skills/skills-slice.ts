import type {PayloadAction} from '@reduxjs/toolkit';
import {clone, find, concat, pipe, reject, sortBy, set} from 'remeda';
import type {Publication} from '../../types/types';

const initialState = [];

// Use the initialState as a default value
// eslint-disable-next-line @typescript-eslint/default-param-last
export default function skillsReducer(state = initialState, action: PayloadAction) {
	// The reducer normally looks at the action type field to decide what happens
	switch (action.type) {
		// Do something here based on the different types of actions
		case 'skills/preload': {
			return sortBy(action.payload, x => x.name);
		}

		case 'skills/skillPicked': {
			const skill = pipe(state, find(each => each.id === Number.parseInt(action.payload)), clone);
			skill.selected = !skill.selected;
			const newState = pipe(state, reject(each => each.id === Number.parseInt(action.payload)), concat([skill]), sortBy(x => x.name));

			return newState;
		}

		default:
			// If this reducer doesn't recognize the action type, or doesn't
			// care about this specific action, return the existing state unchanged
			return state;
	}
}
