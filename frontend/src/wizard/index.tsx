import type {FormEvent} from 'react';
import {useState} from 'react';
import {not, keys, includes} from 'ramda';
import * as R from 'remeda';
import {useSelector} from 'react-redux';
import {equals, pipe} from 'remeda';
import {appendString,
	defaultToEmptyString,
	containsNumbers,
	isNotEmptyArray,
} from '../utils/extra-remeda';
import type {Author, Publication} from '../types/types';
import store from '../store';
import ValidatorPick from '../validator-pick';
import AuthorPick from '../author-pick';
import PreviewForm from '../preview-view/index';
import SearchForm from '../search-view';
import SkillForm from '../skill-view';

const FORM_STATE = {
	quiet: 0,
	typing: 1,
	submitting: 2,
	success: 3,
	error: 4,
};
const FETCH = 'fetch';
const SEARCH = 'search';
const PUBMED_ENDPOINTS = {
	fetch: '/api/fetch?id=',
	search: '/api/search?term=',
};

const aintValid = (endpoint: string) =>
	!(includes(endpoint, keys(PUBMED_ENDPOINTS)), not);

const STEPS = {
	0: 'SEARCH',
	1: 'PICK_AUTHOR',
	2: 'CLAIM',
	3: 'PICK_PEERS',
};

function Wizard() {
	const [search, setSearch] = useState('');
	const [currentStep, setStep] = useState(STEPS[0]);
	/*
	const [publication, setPublication] = useState({
		title: '',
		abstract: '',
		authors: [],
		date: 0,
		pubmedId: '',
	} as Publication);
	*/
	const [status, setStatus] = useState(FORM_STATE.quiet);

	const selectedPublication: Publication = useSelector((state: RootState) => state.search.selectedPublication as Publication);
	const selectedAuthor: Author = useSelector((state: RootState) => state.search.selectedAuthor as Author);
	const publicationSkills = useSelector(state => state.skills as Skill[]);
	const currentlySelected = publicationSkills.filter(each => each.selected);

	const handleGoToStep = (event: FormEvent) => {
		const step = (event.currentTarget as HTMLInputElement).dataset.step!;
		console.log(`Going to step: ${step}`);
		setStep(step);
	};

	const goToNextStep = () => {
		switch (currentStep) {
			case STEPS[0]:
				setStep(STEPS[1]);
				break;
			case STEPS[1]:
				setStep(STEPS[2]);
				break;
			case STEPS[2]:
				setStep(STEPS[3]);
				break;
			case STEPS[3]:
				// do something here
				break;
			default:
				break;
		}
	};

	function whileSubmitting() {
		return R.equals(FORM_STATE.submitting, status);
	}

	function handleChange(event: FormEvent) {
		setStatus(FORM_STATE.typing);
		const value = (event.target as HTMLInputElement).value;
		setSearch(value);
	}

	function goToStepFour() {
		goToStep(3);
	}

	function goToStepThree() {
		goToStep(2);
	}

	function goToStepTwo() {
		goToStep(1);
	}

	function goToStep(step: number): void {
		setStep(STEPS[step]);
	}

	function renderAuthorPick() {
		return (
			<>
				<AuthorPick/>
				{displayNextButton()}
			</>
		);
	}

	function renderPeersPick() {
		return (
			<>
				<ValidatorPick/>
			</>);
	}

	function renderSkillClaim() {
		return (
			<>
				<SkillForm></SkillForm>
				{displayNextButton()}
			</>
		);
	}

	const displayNextButton = () => (<>
		{currentStep === STEPS[0] && selectedPublication?.title && <button className='btn btn-wide' onClick={goToNextStep}>Next</button>}

		{currentStep === STEPS[1] && selectedAuthor?.foreName && <button className='btn btn-wide' onClick={goToNextStep}>Next</button>}

		{currentStep === STEPS[2] && isNotEmptyArray(currentlySelected) && <button className='btn btn-wide' onClick={goToNextStep}>Next</button>}
	</>);

	function renderSearch() {
		return (
			<>
				<SearchForm/>
				<PreviewForm/>
				{displayNextButton()}
			</>);
	}

	function highlightStepTwo() {
		return currentStep === STEPS[1] || highlightStepThree();
	}

	function highlightStepThree() {
		return currentStep === STEPS[2] || highlightStepFour();
	}

	function highlightStepFour() {
		return currentStep === STEPS[3];
	}

	return (
		<>
			<ul className='steps steps-vertical lg:steps-horizontal spacious'>
				<li onClick={handleGoToStep} data-step={STEPS[0]} className='step step-primary'>Search for a publication</li>
				<li onClick={handleGoToStep} data-step={STEPS[1]} className={highlightStepTwo() ? 'step step-primary' : 'step'}>Identify as author</li>
				<li onClick={handleGoToStep} data-step={STEPS[2]} className={highlightStepThree() ? 'step step-primary' : 'step'}>Claim skills</li>
				<li onClick={handleGoToStep} data-step={STEPS[3]} className={highlightStepFour() ? 'step step-primary' : 'step'}>Peer validation</li>
			</ul>
			<p></p>
			<div>
				{ currentStep === STEPS[0] && renderSearch() }
				{ currentStep === STEPS[1] && renderAuthorPick() }
				{ currentStep === STEPS[2] && renderSkillClaim() }
				{ currentStep === STEPS[3] && renderPeersPick() }
			</div>
		</>
	);
}

export default Wizard;
