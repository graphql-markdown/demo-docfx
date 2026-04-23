# GraphQL-Markdown + DocFX demo

This project demonstrates how to generate GraphQL documentation with GraphQL-Markdown for a [DocFX](https://dotnet.github.io/docfx/) site using the modern template.

## Quick start

```bash
npm install
npm run dev
```

Open `http://localhost:8080/` and browse the **GraphQL API** section in the left navigation.

## Prerequisites

- [Node.js](https://nodejs.org) 20 or later
- [.NET SDK](https://dotnet.microsoft.com/download) 8 or later
- DocFX installed as a global .NET tool:

```bash
dotnet tool install -g docfx
```

## Commands

| Command | Action |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run generate` | Generate docs from the GraphQL schema |
| `npm run dev` | Generate docs + serve a local DocFX preview |
| `npm run build` | Generate docs + build a static site to `_site/` |
| `npm run clean` | Remove generated files and build output |

## Project structure

```text
.
├── content/
│   └── index.md                    # Homepage source for the GraphQL API section
├── docs/
│   ├── graphql/                    # Generated GraphQL documentation
│   │   ├── index.md                # GraphQL API overview (copied from content/index.md)
│   │   ├── toc.yml                 # Generated navigation
│   │   ├── operations/             # Queries, mutations, subscriptions
│   │   └── types/                  # Objects, scalars, directives
│   ├── introduction.md
│   ├── getting-started.md
│   └── toc.yml
├── schema.graphql                  # Sample GraphQL schema
├── scripts/
│   ├── custom-docfx-mdx.mjs        # Custom MDX formatter (badge color overrides)
│   └── generate-docs.mjs           # GraphQL-Markdown runner
├── docfx.json                      # DocFX site configuration
├── index.md                        # Site root (redirects to introduction)
├── toc.yml                         # Top-level navigation
└── package.json
```

## Notes

- The preset `@graphql-markdown/formatters/docfx` provides:
  - DocFX alert syntax (`> [!NOTE]`, `> [!WARNING]`, etc.) for admonitions
  - Bootstrap 5 badge classes (`badge text-bg-{variant}`) for type badges
  - Path-derived `uid` front matter for unique DocFX cross-reference targets (e.g. `operations-queries-continent`)
  - `afterRenderTypeEntitiesHook` that builds `toc.yml` navigation files at every directory level automatically
- Badge colors can be customized in `scripts/custom-docfx-mdx.mjs` by spreading `BADGE_CLASS_MAP` and overriding individual entries.
- `toc.yml` files in `docs/graphql/` are generated at doc-generation time and should not be edited manually.
