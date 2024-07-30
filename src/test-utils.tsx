import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { RenderOptions } from '@testing-library/react';
import { render } from '@testing-library/react';

export const renderWithQueryProvider = (ui: React.ReactNode, options?: RenderOptions) => {
  const queryClient = new QueryClient();

  return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>, options);
};
