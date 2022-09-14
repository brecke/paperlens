defmodule Paperlens.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      # Start the Ecto repository
      Paperlens.Repo,
      # Start the PubSub system
      {Phoenix.PubSub, name: Paperlens.PubSub}
      # Start a worker by calling: Paperlens.Worker.start_link(arg)
      # {Paperlens.Worker, arg}
    ]

    Supervisor.start_link(children, strategy: :one_for_one, name: Paperlens.Supervisor)
  end
end
