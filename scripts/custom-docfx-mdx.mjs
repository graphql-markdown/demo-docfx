import DocFXFormatter from "@graphql-markdown/formatters/docfx";

const {
  createMDXFormatter,
  afterRenderTypeEntitiesHook,
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

export { afterRenderTypeEntitiesHook };

// The page `# Title` heading is printed by the preset's `formatMDXTitle`.
export default {
  ...createMDXFormatter(),
  formatMDXBadge,
  mdxExtension,
  afterRenderTypeEntitiesHook,
};
