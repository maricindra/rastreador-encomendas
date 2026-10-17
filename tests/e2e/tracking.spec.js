const { test, expect } = require("@playwright/test");

test("rastreia LOG999 e mostra o status entregue", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Rastrear" }).waitFor();
  await page.getByRole("button", { name: "LOG999", exact: true }).click();

  await expect(page).toHaveURL(/number=LOG999/, { timeout: 15000 });
  await expect(page.getByRole("heading", { name: "LOG999" })).toBeVisible();
  await expect(page.getByText("Entregue", { exact: true })).toBeVisible();
  await expect(page.getByText(/tempo mínimo de entrega/i)).toBeVisible();
});

test("abre o mapa da encomenda sem depender do GPS", async ({ page }) => {
  await page.goto("/tracking?number=LOG123");
  await page.getByRole("button", { name: /mostrar encomenda no mapa/i }).click();

  await expect(page.locator(".leaflet-container")).toBeVisible();
});
