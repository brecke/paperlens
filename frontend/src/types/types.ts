type Author = {
	foreName: string;
	lastName: string;
	affilitation: Organization;
};

type Skill = {
	id?: number;
	name?: string;
	selected?: boolean;
};

type Organization = {
	name: string;
};

type Publication = {
	authors: Author[];
	abstract: string;
	date: number;
	title: string;
	body?: string;
	pubmedId: string;
};

type JSONPublication = {
	PubmedArticleSet: {
		PubmedArticle: {
			MedlineCitation: {
				'#content': {
					PMID: {'#content': string};
					Article: {
						'#content': {
							Abstract: {
								AbstractText: string;
							};
							ArticleDate: {
								'#content': {
									Day: string;
									Month: string;
									Year: string;
								};
							};
							ArticleTitle: string;
						};
					};
				};
			};
		};
	};
};

type SearchState = {selectedPeers: Author[]; selectedAuthor: Author; selectedPublication: Publication};

export type {
	Publication, Skill, Author, Organization, JSONPublication, SearchState,
};
