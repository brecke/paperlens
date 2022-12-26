import {useSelector} from 'react-redux';
import {getFullName} from '../../utils/author-utils';

import type {Author, Publication, SearchState} from '../../types/types';
import type {RootState} from '../../store';

function Summary() {
	const getSelectedPublication = (state: RootState) => (state.search as SearchState).selectedPublication;
	const selectedPublication: Publication = useSelector(getSelectedPublication);

	const getSelectedPeers = (state: RootState) => (state.search as SearchState).selectedPeers;
	const selectedPeers: Author[] = useSelector(getSelectedPeers);

	const getSkills = (state: RootState) => state.skills;
	const publicationSkills = useSelector(getSkills);

	const getSelectedAuthor = (state: RootState) => (state.search as SearchState).selectedAuthor;
	const selectedAuthor: Author = useSelector(getSelectedAuthor);

	return (
		<>
			<h2 className='text-slate-500'>Please review:</h2>
			<article className='prose'>
				<p>Publication:</p>
				<p>{ selectedPublication.title }</p>
				<p>Claiming author:</p>
				<p>{ getFullName(selectedAuthor)}</p>
				<p>Contributions:</p>
				<ul>
					{publicationSkills.filter(eachPublication => eachPublication.selected).map(eachSkill => (
						<li key={eachSkill.name}> { eachSkill.name}</li>
					)) }
				</ul>
				<p>Validating peers:</p>
				<ul>
					{selectedPeers.map(eachPeer => (
						<li key={getFullName(eachPeer)}>{ getFullName(eachPeer) }</li>
					))}
				</ul>
			</article>
		</>
	);
}

export default Summary;
