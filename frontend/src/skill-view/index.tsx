import type {FormEvent} from 'react';
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {formatDistance, format} from 'date-fns';
import {useSelector} from 'react-redux';
import {equals, find} from 'remeda';
import store from '../store';
import type {Author, Publication} from '../types/types';
import {isEmptyString} from '../utils/extra-remeda';
import {getFullName} from '../utils/author-utils';
import type {RootState} from '../store';

type Skill = {
	id: number;
	name: string;
	selected: boolean;
};

function SkillForm() {
	const skills: Skill[] = [{id: 1, name: 'Funding acquisition', selected: false}, {id: 2, name: 'Western blot', selected: false}, {id: 3, name: 'CRISPR-cas9', selected: false}, {id: 4, name: 'Microscopy', selected: false}, {id: 5, name: 'electrophysiology', selected: false}, {id: 6, name: 'Immunoprecipitation', selected: false}, {id: 7, name: 'animal handling', selected: false}, {id: 8, name: 'statistics', selected: false}, {id: 9, name: 'imaging', selected: false}, {id: 10, name: 'general coordination', selected: false}];

	const publicationSkills = useSelector(state => state.skills as Skill[]);

	const selectedPublication: Publication = useSelector((state: RootState) => state.search.selectedPublication as Publication);

	const pickSkill = (event: FormEvent) => {
		const skillId = (event.currentTarget as HTMLInputElement).dataset.id;
		store.dispatch({type: 'skills/skillPicked', payload: skillId});
	};

	useEffect(() => {
		if (publicationSkills.length === 0) { // preload default skills
			store.dispatch({type: 'skills/preload', payload: skills});
		}
	});

	return (<>
		<h1>{selectedPublication.title}</h1>
		<ul>
			<li>PubmedID: {selectedPublication.pubmedId}</li>
			<li>Date: { format(new Date(selectedPublication.date), 'MM/dd/yyy')}</li>
		</ul>
		<div>
			<h2>Claimable skills:</h2>
			{publicationSkills.map(eachSkill => (
				<button key={eachSkill.id} onClick={pickSkill} data-id={eachSkill.id} className={ eachSkill.selected ? 'btn btn-spaceous btn-accent' : 'btn btn-spaceous btn-outline'}>{eachSkill.name}</button>
			))}
		</div>
		<p>You have selected {publicationSkills.filter(each => each.selected).length} skills for this publication.</p>
		<button disabled={true} className='btn btn-xs sm:btn-sm md:btn-md lg:btn-lg'>Next step</button>
	</>);
}

export default SkillForm;