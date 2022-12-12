import type {FormEvent} from 'react';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {formatDistance} from 'date-fns';
import {useSelector, useDispatch} from 'react-redux';
import {equals, find} from 'remeda';
import * as R from 'remeda';
import type {Author, Publication} from '../../types/types';
import {getFullName} from '../../utils/author-utils';
import type {RootState} from '../../store';

function AuthorPick() {
	const selectedPublication: Publication = useSelector((state: RootState) => state.search.selectedPublication as Publication);
	const selectedAuthor: Author = useSelector((state: RootState) => state.search.selectedAuthor as Author);

	const dispatch = useDispatch();

	const authorSelected = (event: FormEvent) => {
		const authorClickedOn = (event.currentTarget as HTMLInputElement).dataset.selectedauthor;

		// TODO remove dup
		const nameMatchesSelectedRadio = (eachPublicationAuthor: Author) => equals(getFullName(eachPublicationAuthor), authorClickedOn);
		const author: Author | undefined = find(selectedPublication.authors, nameMatchesSelectedRadio);

		dispatch({type: 'search/authorSelected', payload: author});
	};

	function matchesSelectedAuthor(fullName: string): boolean {
		return R.equals(fullName, getFullName(selectedAuthor));
	}

	return (
		<>
			<h1>Identify yourself among all authors:</h1>
			<article className='prose'>
				{
					selectedPublication.authors.map((eachAuthor: Author) => (
						<div className='form-control' key={getFullName(eachAuthor)}>
							<label className='label cursor-pointer'>
								<input type='radio' checked={matchesSelectedAuthor(getFullName(eachAuthor))} name='radio-10' onChange={authorSelected} data-selectedauthor={getFullName(eachAuthor)} className='radio checked:bg-blue-500'>
								</input>

								<span className='label-text'>{getFullName(eachAuthor)}</span>
							</label>
						</div>
					))
				}
			</article>
		</>
	);
}

export default AuthorPick;
