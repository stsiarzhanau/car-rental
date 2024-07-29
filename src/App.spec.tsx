import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test } from 'vitest';

import App from './App';

test('Vitest + React Testing Library + jest-dom + user-event setup works as expected in Vite app', async () => {
  const user = userEvent.setup();
  render(<App />);
  const buttonElement = screen.getByRole('button', { name: /count is/i });
  expect(buttonElement).toHaveTextContent('count is 0');
  await user.click(buttonElement);
  expect(buttonElement).toHaveTextContent('count is 1');
});
