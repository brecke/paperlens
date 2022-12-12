import type {FormEvent} from 'react';
import {useState} from 'react';
import {not, keys, includes} from 'ramda';
import * as R from 'remeda';
import {useDispatch} from 'react-redux';
import {appendString,
	defaultToEmptyString,
	containsNumbers,
} from '../../utils/extra-remeda';
import type {JSONPublication, Publication} from '../../types/types';
import {
	getPublicationAbstract,
	getPublicationDate,
	getAuthors,
	getPublicationTitle,
	getPubmedId,
} from './pubmed-utils';

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

function SearchForm() {
	const [search, setSearch] = useState('');
	const [status, setStatus] = useState(FORM_STATE.quiet);

	const dispatch = useDispatch();

	function whileSubmitting() {
		return R.equals(FORM_STATE.submitting, status);
	}

	function handleChange(event: FormEvent) {
		setStatus(FORM_STATE.typing);
		const value = (event.target as HTMLInputElement).value;
		setSearch(value);
	}

	async function fetchFromPubmed(endpoint: typeof FETCH | typeof SEARCH, parameters: string) {
		if (aintValid(endpoint)) {
			return;
		}

		// Import.meta.env.VITE_PUBMED_API_KEY
		const url = R.pipe(PUBMED_ENDPOINTS, R.prop(endpoint), appendString(parameters));
		try {
			const response = await fetch(url).then(async response => response.json() as Promise<JSONPublication>);

			setStatus(FORM_STATE.success);

			const publication: Publication = {
				title: R.pipe(response, getPublicationTitle, defaultToEmptyString),
				authors: getAuthors(response),
				date: getPublicationDate(response),
				abstract: getPublicationAbstract(response),
				pubmedId: getPubmedId(response),
			};

			dispatch({type: 'search/publicationSelected', payload: publication});
		} catch {
			setStatus(FORM_STATE.error);
		}
	}

	async function handleSubmit(event: FormEvent) {
		event.preventDefault();
		setStatus(FORM_STATE.submitting);

		/**
     * If it's a number, we treat is as a PMID and fetch it from pubmed
     * Otherwise we'll search the keywords on pubmed and fetch the first result it returns
     */
		if (containsNumbers(search)) {
			return fetchFromPubmed(FETCH, search);
		}

		return fetchFromPubmed(SEARCH, search);
	}

	return (
		<>
			<h1>Search for a publication</h1>
			<form onSubmit={handleSubmit}>
				<div className='form-control w-full max-w-xs'>
					<label className='label'>
						<span className='label-text'>Find a paper by title on pubmed</span>
					</label>
					<div className='form-control'>
						<div className='input-group'>
							<input type='text' onChange={handleChange} placeholder='Insert paper title or PMID e.g. In vitro ischemia...' className='input input-bordered input-lg w-full max-w-xs' />
							<button className='btn btn-square lg:btn-lg' disabled={whileSubmitting()} onClick={handleSubmit}>
								<svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' /></svg>
							</button>
						</div>
					</div>

				</div>
			</form>
		</>);
}

export default SearchForm;
