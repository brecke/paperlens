import type {FormEvent} from 'react';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {not, keys, includes, pipe, isEmpty, concat, prop} from 'ramda';
import * as R from 'remeda';
import {appendString,
	defaultToEmptyString,
	containsNumbers,
	isEmptyArray,
	isNotEmptyString,
} from '../utils/extra-remeda';
import type {JSONPublication, Publication} from '../types/types';
import store from '../store';
import {
	getPublicationAbstract,
	getPublicationDate,
	getAuthors,
	getPublicationTitle,
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
	const navigate = useNavigate();
	const [search, setSearch] = useState('');
	const [publication, setPublication] = useState({
		title: '',
		abstract: '',
		authors: [],
		date: 0,
	} as Publication);
	const [status, setStatus] = useState(FORM_STATE.quiet);

	function whileSubmitting() {
		return R.equals(FORM_STATE.submitting, status);
	}

	function handleChange(event: FormEvent) {
		setStatus(FORM_STATE.typing);
		const value = (event.target as HTMLInputElement).value;
		setSearch(value);
	}

	async function fetchFromPubmed(endpoint: 'fetch' | 'search', parameters: string) {
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
			};
			// TODO: we won't need to set component state once we have redux in place
			setPublication(publication);

			// TODO extract from response
			const pubmedId = '24960035';

			store.dispatch({type: 'search/publicationSelected', payload: publication});

			/*
			Navigate(
				{
					pathname: `/publication/${pubmedId}`,
				},
			);
			*/
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
					<input
						type='text'
						placeholder='Insert paper title or PMID e.g. In vitro ischemia...'
						className='input input-bordered input-lg w-full max-w-xs'
						value={search}
						onChange={handleChange}
					/>
					<input
						type='submit'
						value='Search'
						className='btn btn-xs sm:btn-sm md:btn-md lg:btn-lg'
						disabled={whileSubmitting()}
					/>
				</div>
			</form>
		</>
	);
}

export default SearchForm;
