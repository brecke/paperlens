defmodule PaperlensWeb.WebappController do
  use PaperlensWeb, :controller

  def index(conn, _params) do
    conn
    |> send_resp(200, render_react_app())
  end

  def search(conn, params) do
    query =
      if Mix.env() == :dev do
        # debugging on dev
        "In vitro ischemia triggers a transcriptional response to down-regulate synaptic proteins in hippocampal neurons"
      else
        params["term"]
      end

    paper_data =
      Pubmed.e_search(query)
      |> Pubmed.e_fetch()

    json(conn, paper_data)
  end

  @spec fetch(Plug.Conn.t(), any) :: Plug.Conn.t()
  def fetch(conn, params) do
    ids =
      if Mix.env() == :dev do
        # debugging on dev
        ["24960035"]
      else
        [params["id"]]
      end

    paper_data = Pubmed.e_fetch(ids)
    json(conn, paper_data)
  end

  # Serve the index.html file as-is and let React
  # take care of the rendering and client-side rounting.
  #
  # Potential improvement: Cache the file contents here
  # in an ETS table so we don't read from the disk for every request.
  defp render_react_app() do
    Application.app_dir(:paperlens_web, "priv/static/webapp/index.html")
    |> File.read!()
  end
end
