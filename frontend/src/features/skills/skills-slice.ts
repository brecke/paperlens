import type {PayloadAction} from '@reduxjs/toolkit';
import {clone, find, concat, pipe, reject, sortBy} from 'remeda';
import type {Skill} from '../../types/types';

const initialState: Skill[] = [];

// Use the initialState as a default value
// eslint-disable-next-line @typescript-eslint/default-param-last
export default function skillsReducer(state = initialState, action: PayloadAction) {
	// The reducer normally looks at the action type field to decide what happens

	switch (action.type) {
		// Do something here based on the different types of actions
		case 'skills/preload': {
			return sortBy(action.payload, (skill: Skill) => skill.name);
		}

		case 'skills/skillPicked': {
			const theSameIdAsPayload = (each: Skill) => each.id === Number.parseInt(action.payload, 10);
			const skill: Skill | undefined = pipe(state, find(theSameIdAsPayload), clone);

			if (!skill) {
				return state;
			}

			skill.selected = !skill.selected;

			const newState = pipe(state, reject(theSameIdAsPayload), concat([skill]), sortBy((skill: Skill) => skill.name!));

			return newState;
		}

		default:
			// If this reducer doesn't recognize the action type, or doesn't
			// care about this specific action, return the existing state unchanged
			return state;
	}
}
