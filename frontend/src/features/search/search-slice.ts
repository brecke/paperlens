import type {PayloadAction} from '@reduxjs/toolkit';
import {reject} from 'remeda';
import type {Author, Publication} from '../../types/types';
import {getFullName} from '../../utils/author-utils';

const selectedPublication: Publication = {body: '', title: '', date: 0, abstract: '', authors: [], pubmedId: ''};
const selectedPeers: Author[] = [];
const selectedAuthor: Author = {foreName: '', lastName: '', affilitation: {name: ''}};
const initialState = {selectedPublication, selectedPeers, selectedAuthor};

// Use the initialState as a default value
// eslint-disable-next-line @typescript-eslint/default-param-last
export default function searchReducer(state = initialState, action: PayloadAction) {
	// The reducer normally looks at the action type field to decide what happens
	switch (action.type) {
		case 'search/clean': return {selectedPeers, selectedAuthor, selectedPublication};
		case 'search/peerDeselected': {
			let selectedPeers: Author[] = state.selectedPeers ?? [];
			selectedPeers = reject(selectedPeers, (peer: Author) => getFullName(peer) === getFullName(action.payload));

			return {
				...state,
				selectedPeers,
			};
		}

		case 'search/peerSelected': {
			let selectedPeers: Author[] = state.selectedPeers ?? [];
			selectedPeers = [...selectedPeers, action.payload];

			return {
				...state,
				selectedPeers,
			};
		}

		case 'search/authorSelected': {
			return {
				...state,
				selectedAuthor: action.payload,
			};
		}

		case 'search/publicationSelected': {
			return {
				...state,
				selectedPublication: action.payload,
			};
		}

		default:
			// If this reducer doesn't recognize the action type, or doesn't
			// care about this specific action, return the existing state unchanged
			return state;
	}
}
