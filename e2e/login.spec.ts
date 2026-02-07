import { test, expect } from '@playwright/test';

test.describe('Login Flow', () => {
  test('should login successfully and redirect to dashboard', async ({ page }) => {
    // Mock the login API
    await page.route('**/auth/login', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ token: 'fake-jwt-token' }),
      });
    });

    await page.goto('/login');

    // Fill login form
    await page.fill('input[type="email"]', 'admin@doligo.com');
    await page.fill('input[type="password"]', '123456');
    
    // Click submit
    await page.click('button[type="submit"]');

    // Should redirect to dashboard/home
    await expect(page).toHaveURL('/');
    await expect(page.locator('text=Dashboard / Home')).toBeVisible();
  });

  test('should show error on failed login', async ({ page }) => {
    // Mock failed login
    await page.route('**/auth/login', async route => {
      await route.fulfill({
        status: 401,
        contentType: 'application/json',
        body: JSON.stringify({ code: 'UNAUTHORIZED', message: 'Credenciais inválidas' }),
      });
    });

    await page.goto('/login');

    await page.fill('input[type="email"]', 'wrong@doligo.com');
    await page.fill('input[type="password"]', 'wrong');
    await page.click('button[type="submit"]');

    // Should show error message from ErrorMap (for 401 it's 'Sessão expirada...' or handled by hook)
    // useLogin maps 401 to UI message via mapErrorCodeToMessage
    await expect(page.locator('text=Sessão expirada')).toBeVisible();
  });
});
