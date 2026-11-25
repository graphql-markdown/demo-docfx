import { relative, sep } from "node:path";

import { readFile, saveFile } from "@graphql-markdown/utils";
import DocFXFormatter from "@graphql-markdown/formatters/docfx";
import { toLink } from "@graphql-markdown/printer-legacy";

const {
  createMDXFormatter,
  afterRenderTypeEntitiesHook: docfxAfterRenderTypeEntitiesHook,
  mdxExtension,
  BADGE_CLASS_MAP,
} = DocFXFormatter;

export { mdxExtension };

// Override individual badge colors by spreading the defaults and replacing entries.
// Available Bootstrap 5 classes: text-bg-{primary,secondary,success,danger,warning,info,light,dark}
// The demo stylesheet (template/public/main.css) turns them into soft pills
// that follow the light/dark theme.
const badgeClassMap = {
  ...BADGE_CLASS_MAP,
  // DEPRECATED: "text-bg-warning",
  // NON_NULL: "text-bg-success",
};

const formatMDXBadge = ({ text, classname }) => {
  const key = Array.isArray(classname) ? classname[0] : classname;
  const variant = (key && badgeClassMap[key]) ?? "text-bg-secondary";
  return `<span class="badge ${variant}">${text}</span>`;
};

const preset = createMDXFormatter();

// Public URL of the generated pages' folder (site URL + base path + baseURL)
const COPIES_URL = "https://graphql-markdown.dev/demo-docfx/docs/graphql";

// Pages render concurrently, so this may hold another page's options: only read
// settings shared by every page (schema, basePath, hierarchy, groups, deprecated, formatMDXLink).
let printOptions;

/**
 * Hook that captures the resolved print options before each page is printed.
 */
const beforePrintTypeHook = (event) => {
  printOptions = event.data.options;
};

/**
 * Replaces inline code names matching a schema type with a link to its page.
 */
const linkEntities = (text) => {
  const schema = printOptions?.schema;
  const rootTypes = [
    schema?.getQueryType(),
    schema?.getMutationType(),
    schema?.getSubscriptionType(),
  ];

  return text.replaceAll(/`([_A-Za-z][_0-9A-Za-z]*)`/g, (match, name) => {
    const type = schema?.getType(name);
    if (!type || name.startsWith("__") || rootTypes.includes(type)) {
      return match;
    }
    const { url } = toLink(type, name, undefined, printOptions);
    return url === "#" ? match : `[\`${name}\`](${url})`;
  });
};

/**
 * Links entities in deprecation admonitions, whatever the title case, so the
 * `@deprecatedType` notices (titled "Deprecated") are linked too.
 */
const formatMDXAdmonition = (admonition, meta) => {
  const text =
    admonition.title?.toLowerCase() === "deprecated" && admonition.text
      ? linkEntities(admonition.text)
      : admonition.text;
  return preset.formatMDXAdmonition({ ...admonition, text }, meta);
};

/**
 * Appends a "View as Markdown" link to each page, pointing to its copy.
 */
const pageLinkHook = async (event) => {
  const { filePath, outputDir, outputAdapter } = event.data;
  const path = relative(outputDir, filePath)
    .split(sep)
    .join("/")
    .replace(/\.mdx?$/, "");
  const link = `\n\n[View as Markdown](${COPIES_URL}/${path}.md)\n`;

  // Use the output adapter when one is configured, the file system otherwise
  const page = outputAdapter?.readFile
    ? await outputAdapter.readFile(filePath)
    : await readFile(filePath, "utf-8");
  const content = `${page.trimEnd()}${link}`;
  await (outputAdapter?.writeFile
    ? outputAdapter.writeFile(filePath, content)
    : saveFile(filePath, content));
};

const afterRenderTypeEntitiesHook = async (event) => {
  await docfxAfterRenderTypeEntitiesHook?.(event);
  await pageLinkHook(event);
};

export { afterRenderTypeEntitiesHook };

// The page `# Title` heading is printed by the preset's `formatMDXTitle`.
export default {
  ...preset,
  beforePrintTypeHook,
  formatMDXAdmonition,
  formatMDXBadge,
  mdxExtension,
  afterRenderTypeEntitiesHook,
};
