import { readFile, writeFile } from "node:fs/promises";

import DocFXFormatter from "@graphql-markdown/formatters/docfx";

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

const FRONT_MATTER = /^---\r?\n([\s\S]*?)\r?\n---\r?\n/;

/**
 * DocFX does not render the front matter `title` as a heading, so generated
 * pages started with the description. Add it as the page H1, right after the
 * front matter, unless the page already has one.
 */
const addPageTitle = async (filePath) => {
  const content = await readFile(filePath, "utf8");
  const frontMatter = FRONT_MATTER.exec(content);
  const title = frontMatter?.[1].match(/^title:\s*(.+)$/m)?.[1].trim();
  if (!title) {
    return;
  }
  const body = content.slice(frontMatter[0].length);
  if (/^#\s/m.test(body.split("\n").find((line) => line.trim()) ?? "")) {
    return;
  }
  await writeFile(
    filePath,
    `${frontMatter[0]}\n# ${title.replace(/^["']|["']$/g, "")}\n${body}`,
  );
};

export const afterRenderTypeEntitiesHook = async (event) => {
  await docfxAfterRenderTypeEntitiesHook(event);
  await addPageTitle(event.data.filePath);
};

export default {
  ...createMDXFormatter(),
  formatMDXBadge,
  mdxExtension,
  afterRenderTypeEntitiesHook,
};
