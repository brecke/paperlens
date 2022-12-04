import type {FormEvent} from 'react';
import {useState} from 'react';
import {formatDistance} from 'date-fns';
import {useSelector} from 'react-redux';
import {equals, find} from 'remeda';
import type {Author, Publication} from '../../types/types';
import {isEmptyString} from '../../utils/extra-remeda';
import {getFullName} from '../../utils/author-utils';
import type {RootState} from '../../store';

function skillForm() {
	const selectedPublication: Publication = useSelector((state: RootState) => state.search.selectedPublication as Publication);

	const displayPreview = (selectedPublication: Publication) => (
		<>
			<article className='prose'>
				<h1>{selectedPublication.title}</h1>
				<h3>{formatDistance(selectedPublication.date, new Date(), {addSuffix: true})}</h3>
			</article>
		</>
	);

	const displayDefaultMessage = () => (<article className='prose'>
		<p>No publication selected</p>
	</article>);

	return (
		<>
			{isEmptyString(selectedPublication.title) ? displayDefaultMessage() : displayPreview(selectedPublication) }
		</>
	);
}

export default skillForm;
