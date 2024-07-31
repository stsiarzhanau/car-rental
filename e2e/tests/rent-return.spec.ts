/* eslint-disable testing-library/prefer-screen-queries */

import { expect, type Page, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

async function rentCar(page: Page) {
  await page.getByTitle('Porsche 911').click();
  await page.getByPlaceholder('Enter your name').click();
  await page.getByPlaceholder('Enter your name').fill('Alex');
  await page.getByRole('button', { name: 'Rent' }).click();
}

test.describe('Rent operation', () => {
  test(`successfully performs rent operation when clicking on a "Rent" button if a car is selected
on a map and name is entered and shows success toast notification`, async ({ page }) => {
    await rentCar(page);
    await expect(page.getByText(/dear ALex/i)).toBeVisible();
  });

  test(`does not perform rent operation when clicking on a "Rent" button if a car is selected on
a map but name is not entered and shows proper toast notification`, async ({ page }) => {
    await page.getByTitle('Land Rover Range Rover').click();
    await page.getByRole('button', { name: 'Rent' }).click();
    await expect(page.getByText(/please enter your name/i)).toBeVisible();
  });

  test(`does not perform rent operation when clicking on a "Rent" button if name is entered but a
car is not selected on a map and shows proper toast notification`, async ({ page }) => {
    await page.getByPlaceholder('Enter your name').click();
    await page.getByPlaceholder('Enter your name').fill('Alex');
    await page.getByRole('button', { name: 'Rent' }).click();
    await expect(page.getByText(/please select the desired car/i)).toBeVisible();
  });

  test(`does not perform rent operation when clicking on a "Rent" button if name is not entered and
a car is not selected on a map and shows proper toast notification`, async ({ page }) => {
    await page.getByRole('button', { name: 'Rent' }).click();
    await expect(page.getByText(/please enter your name and select/i)).toBeVisible();
  });
});

test.describe('Return operation', () => {
  test.beforeEach(async ({ page }) => {
    await rentCar(page);
    await expect(page.getByText(/dear ALex/i)).toBeVisible();
  });

  test(`successfully performs return operation when clicking on a "Return" button if a rented car is
selected and a return location is specified and shows proper toast notification`, async ({
    page,
  }) => {
    await page.getByRole('row').filter({ hasText: 'Porsche' }).click();
    await page.getByRole('button', { name: 'Return' }).click();
    await expect(page.getByText(/thank you/i)).toBeVisible();
  });

  test(`does not perform return operation when clicking on a "Return" button if a rented car is not
selected and return location is not specified and shows proper toast notification`, async ({
    page,
  }) => {
    await page.getByRole('button', { name: 'Return' }).click();
    await expect(
      page.getByText(
        /please select the car you want to return by clicking on the corresponding table row and then specify the return location on the map/i,
      ),
    ).toBeVisible();
  });
});
