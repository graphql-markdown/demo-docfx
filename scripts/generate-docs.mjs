import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

import { runGraphQLMarkdown } from "@graphql-markdown/cli";

const customMDX = pathToFileURL(
  resolve("./scripts/custom-docfx-mdx.mjs"),
).href;

await runGraphQLMarkdown(
  {
    schema: "./schema.graphql",
    rootPath: "./docs",
    baseURL: "graphql",
    linkRoot: "/docs",
    homepage: "./content/index.md",
    mdxParser: customMDX,
    loaders: {
      GraphQLFileLoader: "@graphql-tools/graphql-file-loader",
    },
    pretty: true,
    force: true,
    docOptions: {
      sectionHeaderId: false,
    },
  },
  {},
);

console.log("GraphQL docs generated in docs/graphql");
