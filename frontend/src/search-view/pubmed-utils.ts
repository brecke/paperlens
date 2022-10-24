import * as R from "remeda";
import { defaultToEmptyString } from "../utils/extra-remeda";

import type { JSONPublication } from "../types/types";

const getPublicationTitle = (publication: JSONPublication) => {
  return R.pipe(
    publication?.PubmedArticleSet,
    R.prop("PubmedArticle"),
    R.prop("MedlineCitation"),
    R.prop("#content"),
    R.prop("Article"),
    R.prop("#content"),
    R.prop("ArticleTitle"),
    defaultToEmptyString
  );
};

const getPublicationAbstract = (publication: JSONPublication) => {
  return R.pipe(
    publication?.PubmedArticleSet?.PubmedArticle?.MedlineCitation["#content"]
      ?.Article["#content"]?.Abstract?.AbstractText,
    defaultToEmptyString
  );
};

const getPublicationDate = (publication: JSONPublication) => {
  let parsedDate: { Day: string; Month: string; Year: string } = R.pipe(
    publication?.PubmedArticleSet,
    R.prop("PubmedArticle"),
    R.prop("MedlineCitation"),
    R.prop("#content"),
    R.prop("Article"),
    R.prop("#content"),
    R.prop("ArticleDate"),
    R.prop("#content")
  );

  let date: { Day: number; Month: number; Year: number } = R.mapValues(
    parsedDate,
    (value) => parseInt(value)
  );

  const publicationDate = new Date(
    date["Year"],
    date["Month"] - 1,
    date["Day"]
  );
  return publicationDate;
};

export { getPublicationAbstract, getPublicationDate, getPublicationTitle };
