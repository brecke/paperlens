import type {FormEvent} from 'react';
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import store from '../store';
import {isEmptyString} from '../utils/extra-remeda';
import {getFullName} from '../utils/author-utils';

import type {Skill, Author, Publication} from '../types/types';
import type {RootState} from '../store';

function Summary() {
	const selectedPublication: Publication = useSelector((state: RootState) => state.search.selectedPublication as Publication);

	const selectedPeers: Author[] = useSelector((state: RootState) => state.search.selectedPeers as Author[]);

	const publicationSkills = useSelector((state: RootState) => state.skills);
	const selectedAuthor: Author = useSelector((state: RootState) => state.search.selectedAuthor as Author);

	return (
		<>
			<h1>Please review:</h1>
			<article className='prose'>
				<p>Publication:</p>
				<p>{ selectedPublication.title }</p>
				<p>Claiming author:</p>
				<p>{ getFullName(selectedAuthor)}</p>
				<p>Contributions:</p>
				<ul>
					{publicationSkills.filter(eachPublication => eachPublication.selected).map(eachSkill => (
						<li> { eachSkill.name}</li>
					)) }
				</ul>
				<p>Validating peers:</p>
				<ul>
					{selectedPeers.map(eachPeer => (
						<li>{ getFullName(eachPeer) }</li>
					))}
				</ul>
			</article>
		</>
	);
}

export default Summary;
