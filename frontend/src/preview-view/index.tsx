import type {FormEvent} from 'react';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {formatDistance} from 'date-fns';
import {useSelector} from 'react-redux';
import {equals, find} from 'remeda';
import type {Author, Publication} from '../types/types';
import {isEmptyString} from '../utils/extra-remeda';
import {getFullName} from '../utils/author-utils';
import type {RootState} from '../store';

function skillForm() {
	const [selectedAuthor, setSelectedAuthor] = useState(undefined);
	const navigate = useNavigate();
	const selectedPublication: Publication = useSelector((state: RootState) => state.search.selectedPublication as Publication);

	const authorSelected = (event: FormEvent) => {
		const authorClickedOn = (event.currentTarget as HTMLInputElement).dataset.selectedauthor;

		const nameMatchesSelectedRadio = (eachPublicationAuthor: Author) => equals(getFullName(eachPublicationAuthor), authorClickedOn);
		const whichAuthor: Author | undefined = find(selectedPublication.authors, nameMatchesSelectedRadio);
		setSelectedAuthor(whichAuthor);
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

	const goToSkillForm = () => {
		navigate(
			{
				pathname: `/publication/${selectedPublication.pubmedId}`,
			},
		);
	};

	const displayClaimButton = () => (<>
		<button className='btn btn-wide' onClick={goToSkillForm}>Claim skills on this publication</button>
	</>);

	return (
		<>
			{isEmptyString(selectedPublication.title) ? displayDefaultMessage() : displayPreview(selectedPublication) }
			{selectedAuthor && displayClaimButton() }
		</>
	);
}

export default skillForm;
