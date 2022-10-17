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

    {:ok, %Finch.Response{body: body}} =
      Finch.build(:get, "#{url}")
      |> Finch.request(MyFinch)

    dict = Jason.decode!(body)
    search_result = dict["esearchresult"]
    paper_ids = search_result["idlist"]

    paper_ids
  end

  def e_fetch(paper_ids, retmode \\ "xml") do
    # let's fetch the first element only, for now
    first_paper_id = hd(paper_ids)

    url =
      @base <>
        "efetch.fcgi?db=" <>
        @db <> "&retmode=" <> retmode <> "&id=" <> first_paper_id

    Finch.start_link(name: MyFinch)

    extract_body = fn response ->
      {:ok, %Finch.Response{body: body}} = response
      body
    end

    # {:ok, %Finch.Response{body: body}} =
    paper_data =
      Finch.build(:get, url)
      |> Finch.request(MyFinch)
      |> extract_body.()
      |> XmlToMap.naive_map()

    # paper_data = XmlToMap
    paper_data
  end
end
