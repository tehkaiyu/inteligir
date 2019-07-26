[![Dependencies Status](https://david-dm.org/inteligir/inteligir-platform/status.svg)](https://david-dm.org/inteligir/inteligir-platform)
[![Build Status](https://travis-ci.org/inteligir/inteligir-platform.svg?branch=master)](https://travis-ci.org/inteligir/inteligir-platform) [![Greenkeeper badge](https://badges.greenkeeper.io/inteligir/inteligir-platform.svg)](https://greenkeeper.io/)

# Inteligir

> Collect and share the knowledge from the web

## Directory Layout

```
├── /client                      # ReactJS client, which contains most of our UI
│   ├── /components              # React components, reusable across all pages
│   ├── /pages                   # App route definitions
│   ├── /static                  # Static assets
│   └── /utils                   # Client side helper functions/Utilities/Services
│   └── next.config.js           # Next.js SSR configuration
│── /config                      # Environment configuration
│── /docs                        # App documentation
│── /prisma                      # Prisma datamodel and seed data
│── /server                      # Node.js server
│   ├── /config                  # Server environment variables
│   ├── /schema                  # Prisma generated files and app schema
│   ├── /middlewares             # Express/Apollo middleware
│   ├── /resolvers               # GraphQl resolvers
│   ├── /services                # Server Helper functions/Utilities/Services
│   └── index.js                 # Server entry point
│── /tests                       # Test setup files
│── /tools                       # Setup and deployment scripts
└── /worker                      # JavaScript worker modules
```

## Want to contribute?

- [How can I help?](docs/how-to-help.md)
- [Setup your local Inteligir instance](docs/setup.md)
- [Evolving the server](docs/server.md)
- [Using the GraphQL API](docs/graphql.md)
- [Updating the client](docs/client.md)
- [List of supported environment variables](docs/environment_variables.md)
- [Design System](docs/design.md)
- [Product Features](docs/product.md)
