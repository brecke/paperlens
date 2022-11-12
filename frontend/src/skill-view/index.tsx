import {formatDistance} from 'date-fns';
import {useSelector} from 'react-redux';
// import store from '../store';
import type {Author, Publication} from '../types/types';
import {isEmptyString, isNotEmptyString} from '../utils/extra-remeda';

function skillForm() {
	const selectedPublication = useSelector(state => state.search.selectedPublication);

	return (
		<>
			{isNotEmptyString(selectedPublication.title) && (<article className='prose'>
				<h1>{selectedPublication.title}</h1>
				<h2>{formatDistance(selectedPublication.date, new Date(), {addSuffix: true})}</h2>
				<p>{ selectedPublication.abstract}</p>
				<ul>
					{selectedPublication.authors.map(eachAuthor => (<li>{eachAuthor.foreName} {eachAuthor.lastName}</li>)) }
				</ul>
			</article>) }
			{isEmptyString(selectedPublication.title) && (<article className='prose'>
				<p>No publication selected</p>
			</article>)}
		</>
	);
}

export default skillForm;
