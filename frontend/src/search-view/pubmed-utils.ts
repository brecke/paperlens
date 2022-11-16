import * as R from 'remeda';
import {defaultToEmptyString} from '../utils/extra-remeda';

import type {Author, JSONPublication} from '../types/types';

const getPublicationTitle = (publication: JSONPublication) => R.pipe(
	publication?.PubmedArticleSet,
	R.prop('PubmedArticle'),
	R.prop('MedlineCitation'),
	R.prop('#content'),
	R.prop('Article'),
	R.prop('#content'),
	R.prop('ArticleTitle'),
	defaultToEmptyString,
);

const getPublicationAbstract = (publication: JSONPublication) => R.pipe(
	publication?.PubmedArticleSet?.PubmedArticle?.MedlineCitation['#content']
		?.Article['#content']?.Abstract?.AbstractText,
	defaultToEmptyString,
);

const getPubmedId = (publication: JSONPublication) => R.pipe(
	publication?.PubmedArticleSet?.PubmedArticle?.MedlineCitation['#content']
		?.PMID['#content'],
	defaultToEmptyString,
);

const getAuthors = (publication: JSONPublication) => {
	const authors = publication?.PubmedArticleSet?.PubmedArticle?.MedlineCitation['#content']
		?.Article['#content'].AuthorList['#content']?.Author;

	const result: Author[] = authors.map(eachAuthor => ({
		foreName: eachAuthor['#content'].ForeName as string,
		lastName: eachAuthor['#content'].LastName as string,
		affilitation: eachAuthor['#content'].AffiliationInfo.Affiliation as string,
	} as Author));

	return result;
};

const getPublicationDate = (publication: JSONPublication) => {
	const parsedDate: {Day: string; Month: string; Year: string} = R.pipe(
		publication?.PubmedArticleSet,
		R.prop('PubmedArticle'),
		R.prop('MedlineCitation'),
		R.prop('#content'),
		R.prop('Article'),
		R.prop('#content'),
		R.prop('ArticleDate'),
		R.prop('#content'),
	);

	const date: {Day: number; Month: number; Year: number} = R.mapValues(
		parsedDate,
		value => Number.parseInt(value, 10),
	);

	const publicationDate = new Date(
		date.Year,
		date.Month - 1,
		date.Day,
	);
	return publicationDate.getTime();
};

export {getPubmedId, getAuthors, getPublicationAbstract, getPublicationDate, getPublicationTitle};
