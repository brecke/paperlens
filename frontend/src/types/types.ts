type Author = {
	foreName: string;
	lastName: string;
	affilitation: Organization;
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
};

type JSONPublication = {
	PubmedArticleSet: {
		PubmedArticle: {
			MedlineCitation: {
				'#content': {
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

export type {
	Publication, Author, Organization, JSONPublication,
};
