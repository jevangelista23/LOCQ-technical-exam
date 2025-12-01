import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/#/');
});

test('Create a Todo list successfully', async ({ page }) => {
  const todoInput = page.getByPlaceholder('What needs to be done?');

  await todoInput.fill('Buy milk');
  await todoInput.press('Enter');

  await expect(page.locator('.todo-list li')).toHaveCount(1);
  await expect(page.locator('.todo-list li label')).toHaveText('Buy milk');
});

test('Edit a Todo list successfully', async ({ page }) => {
  const todoInput = page.getByPlaceholder('What needs to be done?');

  await todoInput.fill('Buy milk');
  await todoInput.press('Enter');

  const todoItem = page.locator('.todo-list li');
  await todoItem.dblclick();

  const editInput = todoItem.locator('.edit');

  await editInput.fill('Buy milk and bread');
  await editInput.press('Enter');

  await expect(todoItem.locator('label')).toHaveText('Buy milk and bread');
});

test('Delete a Todo list successfully', async ({ page }) => {
  const todoInput = page.getByPlaceholder('What needs to be done?');

  await todoInput.fill('Buy milk');
  await todoInput.press('Enter');

  const todoItem = page.locator('.todo-list li');
  await todoItem.hover();

  await todoItem.locator('.destroy').click();

  await expect(page.locator('.todo-list li')).toHaveCount(0);
});

test('Complete the Todo list successfully', async ({ page }) => {
  const todoInput = page.getByPlaceholder('What needs to be done?');

  await todoInput.fill('Buy milk');
  await todoInput.press('Enter');

  const checkbox = page.locator('.todo-list li .toggle');
  await checkbox.check();

  await expect(page.locator('.todo-list li')).toHaveClass(/completed/);
});

test('Clear completed Todo list successfully', async ({ page }) => {
  const todoInput = page.getByPlaceholder('What needs to be done?');

  await todoInput.fill('Buy milk');
  await todoInput.press('Enter');

  await page.locator('.todo-list li .toggle').check();

  const clearBtn = page.getByRole('button', { name: 'Clear completed' });
  await clearBtn.click();

  await expect(page.locator('.todo-list li')).toHaveCount(0);
});
