defmodule PaperlensWeb.PageControllerTest do
  use PaperlensWeb.ConnCase

  test "GET /", %{conn: conn} do
    conn = get(conn, "/")
    assert html_response(conn, 200) =~ "Welcome to Phoenix!"
  end

  @moduletag :api
  test "GET /api/fetch", %{conn: conn} do
    conn = get(conn, "/api/fetch?id=24960035")

    publication =
      json_response(conn, 200)["PubmedArticleSet"]["PubmedArticle"]["MedlineCitation"]["#content"][
        "Article"
      ]["#content"]

    abstract_text = publication["Abstract"]["AbstractText"]
    assert String.starts_with?(abstract_text, "Transient global cerebral ischemia")

    title = publication["ArticleTitle"]
    assert String.starts_with?(title, "In vitro ischemia triggers")
  end

  @moduletag :api
  test "GET /api/search", %{conn: conn} do
    query =
      "In vitro ischemia triggers a transcriptional response to down-regulate synaptic proteins in hippocampal neurons"

    conn = get(conn, "/api/search?term=#{query}")

    publication =
      json_response(conn, 200)["PubmedArticleSet"]["PubmedArticle"]["MedlineCitation"]["#content"][
        "Article"
      ]["#content"]

    abstract_text = publication["Abstract"]["AbstractText"]
    assert String.starts_with?(abstract_text, "Transient global cerebral ischemia")

    title = publication["ArticleTitle"]
    assert String.starts_with?(title, "In vitro ischemia triggers")
  end
end
