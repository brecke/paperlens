defmodule Pubmed do
  @db "pubmed"
  @base "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/"

  def e_search(query, retmode \\ "json") do
    query = URI.encode(query)

    url =
      @base <>
        "esearch.fcgi?db=" <>
        @db <> "&retmode=" <> retmode <> "&term=" <> query

    Finch.start_link(name: MyFinch)

    paper_ids =
      Finch.build(:get, "#{url}")
      |> Finch.request(MyFinch)
      |> extract_body()
      |> Jason.decode!()
      |> Map.get("esearchresult")
      |> Map.get("idlist")

    paper_ids
  end

  defp extract_body(response) do
    # extract_body = fn response ->
    {:ok, %Finch.Response{body: body}} = response
    body
  end

  def e_fetch(paper_ids, retmode \\ "xml") do
    # let's fetch the first element only, for now
    first_paper_id = hd(paper_ids)

    url =
      @base <>
        "efetch.fcgi?db=" <>
        @db <> "&retmode=" <> retmode <> "&id=" <> first_paper_id

    Finch.start_link(name: MyFinch)

    paper_data =
      Finch.build(:get, url)
      |> Finch.request(MyFinch)
      |> extract_body()
      # this bit makes the xml invalid and unparsable :(
      |> String.replace("<b>Competing Interests: </b>", "")
      |> XmlToMap.naive_map()

    paper_data
  end
end
