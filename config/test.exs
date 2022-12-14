import Config

# Configure your database
#
# The MIX_TEST_PARTITION environment variable can be used
# to provide built-in test partitioning in CI environment.
# Run `mix help test` for more information.
config :paperlens, Paperlens.Repo,
  username: "postgres",
  password: "postgres",
  hostname: System.get_env("POSTGRES_TESTING_HOST") || "localhost",
  database: "paperlens_test#{System.get_env("MIX_TEST_PARTITION")}",
  pool: Ecto.Adapters.SQL.Sandbox,
  pool_size: 10

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :paperlens_web, PaperlensWeb.Endpoint,
  http: [ip: {127, 0, 0, 1}, port: 4002],
  secret_key_base: "mxU4XkIuF/B4gGQG0gMB24muBrf3FUcpdnz5BV9hjJYaSK4IrF6fBn3md8oJvOiF",
  server: true

# Print only warnings and errors during test
config :logger, level: :warn

# In test we don't send emails.
config :paperlens, Paperlens.Mailer, adapter: Swoosh.Adapters.Test

# Initialize plugs at runtime for faster test compilation
config :phoenix, :plug_init_mode, :runtime
