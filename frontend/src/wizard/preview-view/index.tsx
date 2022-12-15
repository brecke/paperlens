import {formatDistance} from 'date-fns';
import {useSelector} from 'react-redux';
import type {SearchState, Publication} from '../../types/types';
import {isEmptyString} from '../../utils/extra-remeda';
import type {RootState} from '../../store';

function skillForm() {
	const selectedPublication: Publication = useSelector((state: RootState) => (state.search as SearchState).selectedPublication);

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
