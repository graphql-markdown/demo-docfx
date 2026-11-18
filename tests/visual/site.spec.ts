import { expect, test } from "@playwright/test";
import { argosScreenshot } from "@argos-ci/playwright";

// One page per GraphQL type kind the formatter renders differently.
const pages = [
  ["object", "types/objects/project", "Project"],
  ["enum", "types/enums/project-status", "ProjectStatus"],
  ["interface", "types/interfaces/node", "Node"],
  ["union", "types/unions/search-result", "SearchResult"],
  ["input", "types/inputs/create-project-input", "CreateProjectInput"],
  ["scalar", "types/scalars/date-time", "DateTime"],
  ["query", "operations/queries/projects", "projects"],
  ["mutation", "operations/mutations/create-project", "createProject"],
  ["subscription", "operations/subscriptions/project-changed", "projectChanged"],
  ["directive", "types/directives/deprecated", "deprecated"],
] as const;

const url = (path: string) => `/docs/graphql/${path}.html`;

// Element screenshots are stitched while scrolling, so sticky chrome would be
// painted over the article. Hide it for those shots.
const hideChrome = "header, footer, nav { display: none !important; }";

test("home", async ({ page }) => {
  const response = await page.goto("/");
  expect(response?.status()).toBe(200);
  await expect(page.locator("h1.gqlmd-hero-title")).toHaveText("Your API, mapped with intent.");
  await argosScreenshot(page, "home");
});

for (const [kind, path, title] of pages) {
  test(`page: ${kind}`, async ({ page }) => {
    const response = await page.goto(url(path));
    expect(response?.status()).toBe(200);
    await expect(page.locator("article h1").first()).toContainText(title);
    await argosScreenshot(page, `page-${kind}`, {
      element: page.locator("article"),
      argosCSS: hideChrome,
    });
  });
}

test.describe("dark mode", () => {
  test.use({ colorScheme: "dark" });

  test("home", async ({ page }) => {
    await page.goto("/");
    await argosScreenshot(page, "home-dark");
  });

  test("page: object", async ({ page }) => {
    await page.goto(url("types/objects/project"));
    await argosScreenshot(page, "page-object-dark", {
      element: page.locator("article"),
      argosCSS: hideChrome,
    });
  });
});
