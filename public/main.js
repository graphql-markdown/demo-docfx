// GraphQL-Markdown emits field/argument names as self links (`href="#"`)
// because section header ids are disabled for DocFX. Point each one at the
// heading DocFX generated for it, so the name works as a permalink.
const linkEntityHeadings = () => {
  document
    .querySelectorAll("article :is(h3, h4, h5)[id] > a[href='#']")
    .forEach((link) => {
      link.href = `#${link.parentElement.id}`;
      link.classList.add("gqlmd-permalink");
    });
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", linkEntityHeadings);
} else {
  linkEntityHeadings();
}

export default {};
