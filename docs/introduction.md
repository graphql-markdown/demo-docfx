# Introduction

This demo shows how to use [graphql-markdown](https://graphql-markdown.github.io) with the **DocFX formatter** to generate API reference documentation from a GraphQL schema.

## How it works

`graphql-markdown` introspects a GraphQL schema and generates Markdown pages for every query, mutation, type, input, enum, scalar, and directive. The DocFX formatter (`@graphql-markdown/formatters/docfx`) adapts the output for DocFX:

- Injects a `uid` field in YAML front matter for cross-reference resolution
- Uses DocFX alert syntax (`> [!NOTE]`, `> [!WARNING]`, etc.) for admonitions
- Renders badges as inline `<mark>` elements

## Schema

The demo uses the [shared GraphQL-Markdown demo schema](https://github.com/graphql-markdown/graphql-markdown/blob/main/tests/e2e/__data__/demo_schema.graphql), the same small project-workspace API documented by every GraphQL-Markdown demo. It is loaded from its raw URL at generation time.

## Source

See [Getting Started](getting-started.md) to run the demo locally.

