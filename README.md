[![XO code style](https://shields.io/badge/code_style-5ed9c7?logo=xo&labelColor=gray)](https://github.com/xojs/xo)
[![CircleCI](https://dl.circleci.com/status-badge/img/gh/brecke/paperlens/tree/master.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/brecke/paperlens/tree/master)

# Paperlens.Umbrella

Initial setup heavily inspired by [this post](https://bpaulino.com/entries/modern-webapps-with-elixir-phoenix-typescript-react) and [this one](https://betterprogramming.pub/phoenix-1-6-with-typescript-react-bea7f3a792d5)

## Development

Start the backend:

```
# on project root folder
mix phx.server
```

Start the frontend:

```
cd frontend
npm run dev
```

To run backend API tests:

```
mix test --only api
```

`mix test` runs all the tests including generated ones.

## Production

To generate a release, do as follows:

```
# Generate a secret for our Phoenix app
mix phx.gen.secret
# It will output a very long string. Something like this:
B41pUFgfTJeEUpt+6TwSkbrxlAb9uibgIemaYbm1Oq+XdZ3Q96LcaW9sarbGfMhy

# Now export this secret as a environment variable:
export SECRET_KEY_BASE=B41pUFgfTJeEUpt+6TwSkbrxlAb9uibgIemaYbm1Oq+XdZ3Q96LcaW9sarbGfMhy

# Export the database URL
# Probably very different in production for you.
# I'm just using the local postgreSQL dev instance for this demo
export DATABASE_URL=ecto://postgres:postgres@localhost/phoenix_react_dev

# Get production dependencies
mix deps.get --only prod

# Compile the project for production
MIX_ENV=prod mix compile

# Generate static assets in case you
# are using Phoenix default assets pipelines
# For serve-side rendered pages
MIX_ENV=prod mix assets.deploy

# Generate our React frontend using
# our custom mix task
mix webapp

# Genereate the convenience scripts to assist
# Phoenix applicaiton deployments like running ecto migrations
mix phx.gen.release

# Now we are ready to generate the Elixir Release
MIX_ENV=prod mix release
```

Once the release is ready, one can fire it up:

```
PHX_HOST=localhost _build/prod/rel/phoenix_react/bin/phoenix_react start

# You should an output similar to the following
19:52:53.813 [info] Running PhoenixReactWeb.Endpoint with cowboy 2.9.0 at :::4000 (http)
19:52:53.814 [info] Access PhoenixReactWeb.Endpoint at http://localhost:4000
```

## References

- [Elixir umbrella projects](https://elixir-lang.org/getting-started/mix-otp/dependencies-and-umbrella-projects.html)
- [Phoenix with typescript and react](https://betterprogramming.pub/phoenix-1-6-with-typescript-react-bea7f3a792d5)
