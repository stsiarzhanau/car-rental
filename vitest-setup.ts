import '@testing-library/jest-dom/vitest';

import { cleanup } from '@testing-library/react';
import { afterAll, afterEach, beforeAll } from 'vitest';

import { server } from './src/mocks/server';

/* mswjs.io/docs/integrations/node#test-runner */
beforeAll(() => server.listen());

afterAll(() => server.close());

afterEach(() => {
  /**
   * https://testing-library.com/docs/react-testing-library/api#cleanup
   *
   * Vitest by default doesn't inject a global afterEach() function into the
   * testing environment.
   *
   * So, cleanup is not called automatically after each test and we need to set it
   * up here.
   */
  cleanup();

  server.resetHandlers();
});
