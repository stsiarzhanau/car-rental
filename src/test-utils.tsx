import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { RenderOptions } from '@testing-library/react';
import { render } from '@testing-library/react';
import { Provider, type WritableAtom } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';

export const renderWithQueryProvider = (ui: React.ReactNode, options?: RenderOptions) => {
  const queryClient = new QueryClient();

  return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>, options);
};

type AnyWritableAtom = WritableAtom<unknown, never[], unknown>;
type InitialValues = (readonly [AnyWritableAtom, never])[];

// eslint-disable-next-line react-refresh/only-export-components
const HydrateAtoms = ({
  initialValues,
  children,
}: {
  initialValues: InitialValues;
  children: React.ReactNode;
}) => {
  useHydrateAtoms(initialValues);
  return children;
};

// eslint-disable-next-line react-refresh/only-export-components
const JotaiTestProvider = ({
  initialValues,
  children,
}: {
  initialValues: InitialValues;
  children: React.ReactNode;
}) => (
  <Provider>
    <HydrateAtoms initialValues={initialValues}>{children}</HydrateAtoms>
  </Provider>
);

export const renderWithJotaiProvider = (
  initialValues: InitialValues,
  ui: React.ReactNode,
  options?: RenderOptions,
) => {
  return render(<JotaiTestProvider initialValues={initialValues}>{ui}</JotaiTestProvider>, options);
};
