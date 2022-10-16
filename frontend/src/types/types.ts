interface Author {
	name: string,
	affilitation: Organization
}

interface Organization {
	name: string
}

interface Publication {
	authors: Author[]
	abstract: string
	date: Date
	title: string
}

interface JSONPublication {
  PubmedArticleSet: {
    PubmedArticle: {
      MedlineCitation: {
        "#content": {
          Article: {
            "#content": {
              Abstract: {
                AbstractText: string
              },
              ArticleDate: {
                "#content": { 
                  Day: string,
                  Month: string,
                  Year: string
                }
              },
              ArticleTitle: string,
            };
          };
        };
      };
    };
  };
}


export type {
	Publication, Author, Organization, JSONPublication
}