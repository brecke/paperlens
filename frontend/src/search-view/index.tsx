import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { not, keys, includes, pipe, isEmpty } from "ramda";
import {
  defaultToEmptyString,
  containsNumbers,
  isEmptyArray,
  isNotEmptyString,
} from "../utils/extra-remeda";
import * as R from "remeda";
import {
  getPublicationAbstract,
  getPublicationDate,
  getPublicationTitle,
} from "./pubmed-utils";

const FORM_STATE = {
  quiet: 0,
  typing: 1,
  submitting: 2,
  success: 3,
  error: 4,
};
const FETCH: string = "fetch";
const SEARCH: string = "search";
const PUBMED_ENDPOINTS = {
  [FETCH]: "/api/fetch?id=",
  [SEARCH]: "/api/search?term=",
};

const aintValid = (endpoint: string) =>
  !(includes(endpoint, keys(PUBMED_ENDPOINTS)), not);

function SearchForm() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [publication, setPublication] = useState({
    title: "",
    abstract: "",
    authors: [],
    date: new Date(),
  });
  const [status, setStatus] = useState(FORM_STATE.quiet);

  function whileSubmitting() {
    return R.equals(FORM_STATE.submitting, status);
  }

  function handleChange(event: FormEvent) {
    setStatus(FORM_STATE.typing);
    let value = (event.target as HTMLInputElement).value;
    setSearch(value);
  }

  async function fetchFromPubmed(endpoint: string, params: string) {
    if (aintValid(endpoint)) {
      return;
    }

    // import.meta.env.VITE_PUBMED_API_KEY
    const url: string = `${PUBMED_ENDPOINTS[endpoint]}${params}`;
    try {
      let response = await fetch(url).then((response) => response.json());

      setStatus(FORM_STATE.success);

      setPublication({
        title: R.pipe(response, getPublicationTitle, defaultToEmptyString),
        authors: [],
        date: getPublicationDate(response),
        abstract: getPublicationAbstract(response) as string,
      });

      // TODO extract from response
      const PMID = "24960035";

      navigate({
        pathname: `/publication/${PMID}`,
      });
    } catch (error) {
      // TODO remove
      console.log(error);
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
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Find a paper by title on pubmed</span>
          </label>
          <input
            type="text"
            placeholder="Insert paper title or PMID e.g. In vitro ischemia..."
            className="input input-bordered input-lg w-full max-w-xs"
            value={search}
            onChange={handleChange}
          />
          <input
            type="submit"
            value="Search"
            className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg"
            disabled={whileSubmitting()}
          />
        </div>
        {isNotEmptyString(publication.title) && (
          <div>
            {publication && "Publication:"}
            <ul>
              <li>{publication.title}</li>
              <li>{publication.date.toString()}</li>
            </ul>
          </div>
        )}
      </form>
    </>
  );
}

export default SearchForm;
