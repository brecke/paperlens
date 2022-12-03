import type {FormEvent} from 'react';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {formatDistance} from 'date-fns';
import {useSelector} from 'react-redux';
import {equals, find} from 'remeda';
import * as R from 'remeda';
import type {Author, Publication} from '../types/types';
import {getFullName} from '../utils/author-utils';
import type {RootState} from '../store';
import store from '../store';

function ValidatorPick() {
	const selectedPublication: Publication = useSelector((state: RootState) => state.search.selectedPublication as Publication);

	const selectedPeers: Author[] = useSelector((state: RootState) => state.search.selectedPeers as Author[]);

	const selectedAuthor: Author = useSelector((state: RootState) => state.search.selectedAuthor as Author);

	function peerSelected(event: FormEvent) {
		const authorClickedOn = (event.currentTarget as HTMLInputElement).dataset.selectedauthor;

		// TODO remove dup
		const nameMatchesSelectedRadio = (eachPublicationAuthor: Author) => equals(getFullName(eachPublicationAuthor), authorClickedOn);

		const author: Author = find(selectedPublication.authors, nameMatchesSelectedRadio)!;

		if (!author) {
			return;
		}

		let selectedPeerAction = '';
		selectedPeerAction = (event.currentTarget as HTMLInputElement).checked ? 'search/peerSelected' : 'search/peerDeselected';

		store.dispatch({type: selectedPeerAction, payload: author});
	}

	function shouldBeDisabled(authorCheckbox: string) {
		if (equals(getFullName(selectedAuthor), authorCheckbox)) {
			return true;
		}

		return !selectedPeers.map((eachAuthor: Author) => getFullName(eachAuthor)).includes(authorCheckbox) && selectedPeers?.length >= 3;
	}

	return (
		<>
			<h1>Pick your validation peers</h1>
			<article className='prose'>
				<div className='form-control' >
					{
						selectedPublication.authors.map((eachAuthor: Author) => (
							<label className='label cursor-pointer' key={getFullName(eachAuthor)}>
								<span className='label-text'>{ getFullName(eachAuthor)}</span>
								<input disabled={shouldBeDisabled(getFullName(eachAuthor)) } type='checkbox' onChange={peerSelected} className='checkbox' data-selectedauthor={getFullName(eachAuthor)}/>
							</label>
						))
					}
				</div>
			</article>
		</>
	);
}

export default ValidatorPick;
