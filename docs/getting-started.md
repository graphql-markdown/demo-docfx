# Getting Started

## Prerequisites

- [Node.js](https://nodejs.org) 20 or later
- [.NET SDK](https://dotnet.microsoft.com/download) 8 or later
- DocFX installed as a global .NET tool:

```bash
dotnet tool install -g docfx
```

## Install dependencies

```bash
npm install
```

## Generate the GraphQL docs

```bash
npm run generate
```

This runs `graphql-markdown` against `schema.graphql` and writes Markdown pages to `docs/graphql/`. It also builds the DocFX `toc.yml` navigation files for each section via the custom formatter hook.

## Serve locally

```bash
npm run dev
```

This generates the docs then starts a DocFX local server at `http://localhost:8080`.

## Build static site

```bash
npm run build
```

The built site is written to `_site/`.

