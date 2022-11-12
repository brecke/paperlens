import type {FormEvent} from 'react';
import {formatDistance} from 'date-fns';
import {useSelector} from 'react-redux';
import type {Author, Publication} from '../types/types';
import {isEmptyString} from '../utils/extra-remeda';
import {getFullName} from '../utils/author-utils';

function skillForm() {
	const selectedPublication = useSelector(state => state.search.selectedPublication) as Publication;

	const authorSelected = (event: FormEvent) => {
		const selectedAuthor = (event.currentTarget as HTMLInputElement).dataset.selectedauthor;
		console.log(selectedAuthor);
	};

	const displayPreview = (selectedPublication: Publication) => (
		<>
			<article className='prose'>
				<h1>{selectedPublication.title}</h1>
				<h3>{formatDistance(selectedPublication.date, new Date(), {addSuffix: true})}</h3>
				{selectedPublication.authors.map((eachAuthor: Author) => (
					<div className='form-control' key={getFullName(eachAuthor)}>
						<label className='label cursor-pointer'>
							<input type='radio' name='radio-10' onClick={authorSelected} data-selectedauthor={getFullName(eachAuthor)} className='radio checked:bg-blue-500'>
							</input>

							<span className='label-text'>{getFullName(eachAuthor)}</span>
						</label>
					</div>
				))}
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
