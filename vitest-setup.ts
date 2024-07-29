import '@testing-library/jest-dom/vitest';

import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

/**
 * https://testing-library.com/docs/react-testing-library/api#cleanup
 *
 * Vitest by default doesn't inject a global afterEach() function into the
 * testing environment.
 *
 * So, cleanup is not called automatically after each test and we need to set it
 * up here.
 */
afterEach(() => {
  cleanup();
});
