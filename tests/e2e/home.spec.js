const { test, expect } = require("@playwright/test");

test("exibe a home mobile-first com busca e logo", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: /rastreador de encomendas/i })).toBeVisible();
  await expect(page.getByLabel(/código de rastreio/i)).toBeVisible();
  await expect(page.getByRole("link", { name: /página inicial/i })).toBeVisible();
});
