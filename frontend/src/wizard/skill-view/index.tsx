import type {FormEvent} from 'react';
import {useEffect} from 'react';
import {format} from 'date-fns';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import type {Skill, Publication, SearchState} from '../../types/types';
import type {RootState} from '../../store';

function SkillForm() {
	const dispatch = useDispatch();

	const skills: Skill[] = [{id: 1, name: 'Funding acquisition', selected: false}, {id: 2, name: 'Western blot', selected: false}, {id: 3, name: 'CRISPR-cas9', selected: false}, {id: 4, name: 'Microscopy', selected: false}, {id: 5, name: 'electrophysiology', selected: false}, {id: 6, name: 'Immunoprecipitation', selected: false}, {id: 7, name: 'animal handling', selected: false}, {id: 8, name: 'statistics', selected: false}, {id: 9, name: 'imaging', selected: false}, {id: 10, name: 'general coordination', selected: false}];

	const publicationSkills: Skill[] = useSelector((state: RootState) => state.skills, shallowEqual);
	const selectedPublication: Publication = useSelector((state: RootState) => (state.search as SearchState).selectedPublication);

	const pickSkill = (event: FormEvent) => {
		const skillId = (event.currentTarget as HTMLInputElement).dataset.id;
		dispatch({type: 'skills/skillPicked', payload: skillId});
	};

	useEffect(() => {
		// if (publicationSkills.length === 0) { // preload default skills
		dispatch({type: 'skills/preload', payload: skills});
		// }
	}, []);

	const currentlySelected = publicationSkills.filter(each => each.selected);

	return (
		<>
			{selectedPublication.title && (<>
				<h1>Pick your contributions for this publication</h1>
				<h2>{selectedPublication.title}</h2>
				<ul className='spacious'>
					<li>PubmedID: {selectedPublication.pubmedId}</li>
					<li>Date: { format(new Date(selectedPublication.date), 'MM/dd/yyy')}</li>
				</ul>
				<div>
					{publicationSkills.map(eachSkill => (
						<button key={eachSkill.id} onClick={pickSkill} data-id={eachSkill.id} className={ eachSkill.selected ? 'btn btn-spacious btn-accent' : 'btn btn-spacious btn-outline'}>{eachSkill.name}</button>
					))}
				</div>
				<p>You have selected {currentlySelected.length} skills for this publication.</p>
			</>
			)}
		</>);
}

export default SkillForm;
