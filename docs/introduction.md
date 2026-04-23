# Introduction

This demo shows how to use [graphql-markdown](https://graphql-markdown.github.io) with the **DocFX formatter** to generate API reference documentation from a GraphQL schema.

## How it works

`graphql-markdown` introspects a GraphQL schema and generates Markdown pages for every query, mutation, type, input, enum, scalar, and directive. The DocFX formatter (`@graphql-markdown/formatters/docfx`) adapts the output for DocFX:

- Injects a `uid` field in YAML front matter for cross-reference resolution
- Uses DocFX alert syntax (`> [!NOTE]`, `> [!WARNING]`, etc.) for admonitions
- Renders badges as inline `<mark>` elements

## Schema

The demo uses the [Countries API](https://github.com/trevorblades/countries) schema — a simple public GraphQL API exposing continents, countries, and languages.

## Source

See [Getting Started](getting-started.md) to run the demo locally.

