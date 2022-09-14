defmodule Paperlens.Repo do
  use Ecto.Repo,
    otp_app: :paperlens,
    adapter: Ecto.Adapters.Postgres
end
