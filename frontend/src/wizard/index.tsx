import type {FormEvent} from 'react';
import {useState} from 'react';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import {equals} from 'remeda';
import {
	isNotEmptyArray,
	isNotEmptyString,
} from '../utils/extra-remeda';
import type {Author, Skill, Publication, SearchState} from '../types/types';
import type {RootState} from '../store';
import postData from '../http/fetch-post-data';
import SkillForm from './skill-view';
import AuthorPick from './author-pick';
import PreviewForm from './preview-view/index';
import SearchForm from './search-view';
import Summary from './summary-view';
import ValidatorPick from './validator-pick';

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

const STEPS = {
	0: 'SEARCH',
	1: 'PICK_AUTHOR',
	2: 'CLAIM',
	3: 'PICK_PEERS',
	4: 'SUMMARY',
};

const isThree = (x: number) => equals(3, x);

function Wizard() {
	const [currentStep, setStep] = useState(STEPS[0]);
	const [status, setStatus] = useState(FORM_STATE.quiet);

	const dispatch = useDispatch();

	const selectedPublication: Publication = useSelector((state: RootState) => (state.search as SearchState).selectedPublication);
	const selectedAuthor: Author = useSelector((state: RootState) => (state.search as SearchState).selectedAuthor);
	const currentlySelectedSkills = useSelector((state: RootState) => state.skills.filter(each => each.selected));
	const selectedPeers: Author[] = useSelector((state: RootState) => (state.search as SearchState).selectedPeers, shallowEqual);

	const handleGoToStep = (event: FormEvent) => {
		const step = (event.currentTarget as HTMLInputElement).dataset.step!;
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
				setStep(STEPS[4]);
				break;
			case STEPS[4]:
				return submitClaim();
			default:
				break;
		}
	};

	async function submitClaim() {
		await postData('/api/claim', {selectedAuthor, selectedPeers, selectedPublication})
			.then(data => {
				console.log(data); // JSON data parsed by `data.json()` call
			});

		dispatch({type: 'search/clean'});
	}

	function renderAuthorPick() {
		return (
			<>
				<AuthorPick/>
				{shouldDisplayNextButton(currentStep)}
			</>
		);
	}

	function renderPeersPick() {
		return (
			<>
				<ValidatorPick/>
				{shouldDisplayNextButton(currentStep)}
			</>);
	}

	function renderSkillClaim() {
		return (
			<>
				<SkillForm/>
				{shouldDisplayNextButton(currentStep)}
			</>
		);
	}

	function renderSearch() {
		return (
			<>
				<SearchForm/>
				<PreviewForm/>
				{shouldDisplayNextButton(currentStep)}
			</>);
	}

	function renderSummary() {
		return (
			<>
				<Summary/>
				{shouldDisplayNextButton(currentStep)}
			</>
		);
	}

	function displayNextButton() {
		return <button className='btn btn-wide' onClick={goToNextStep}>Next</button>;
	}

	const shouldDisplayNextButton = (currentStep: string) => {
		switch (true) {
			case currentStep === STEPS[0] && isNotEmptyString(selectedPublication?.title): return displayNextButton();
			case currentStep === STEPS[1] && isNotEmptyString(selectedAuthor?.foreName): return displayNextButton();
			case currentStep === STEPS[2] && isNotEmptyArray(currentlySelectedSkills): return (displayNextButton());
			case currentStep === STEPS[3] && isThree(selectedPeers.length): return (displayNextButton());
			case currentStep === STEPS[4]: return displayNextButton();
			default:
		}
	};

	function highlightStepTwo() {
		return currentStep === STEPS[1] || highlightStepThree();
	}

	function highlightStepThree() {
		return currentStep === STEPS[2] || highlightStepFour();
	}

	function highlightStepFour() {
		return currentStep === STEPS[3] || highlightStepFive();
	}

	function highlightStepFive() {
		return currentStep === STEPS[4];
	}

	return (
		<>
			<ul className='steps steps-vertical lg:steps-horizontal spacious'>
				<li onClick={handleGoToStep} data-step={STEPS[0]} className='step step-primary'>Search for a publication</li>
				<li onClick={handleGoToStep} data-step={STEPS[1]} className={highlightStepTwo() ? 'step step-primary' : 'step'}>Identify as author</li>
				<li onClick={handleGoToStep} data-step={STEPS[2]} className={highlightStepThree() ? 'step step-primary' : 'step'}>Claim skills</li>
				<li onClick={handleGoToStep} data-step={STEPS[3]} className={highlightStepFour() ? 'step step-primary' : 'step'}>Peer validation</li>
				<li onClick={handleGoToStep} data-step={STEPS[4]} className={highlightStepFive() ? 'step step-primary' : 'step'}>Summary</li>
			</ul>
			<p></p>
			<div>
				{ currentStep === STEPS[0] && renderSearch() }
				{ currentStep === STEPS[1] && renderAuthorPick() }
				{ currentStep === STEPS[2] && renderSkillClaim() }
				{ currentStep === STEPS[3] && renderPeersPick() }
				{ currentStep === STEPS[4] && renderSummary() }
			</div>
		</>
	);
}

export default Wizard;
