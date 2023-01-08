# This tag corresponds to node 15.x and alpine 3.11
FROM cimg/elixir:1.14.2-node

LABEL Name="Paperlens"
LABEL Author="Miguel Laginha"
LABEL Email="me@miguellaginha.com"

RUN mix local.hex --force 
RUN mix local.rebar --force 

# Expose ports for node phoenix server
EXPOSE 4000
EXPOSE 443

# Run the app - you may override CMD via docker run command line instruction
ENTRYPOINT ["/bin/sh", "-c"]
# CMD ["node app.js | bunyan"]