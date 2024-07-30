import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { useAtom } from 'jotai';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import CarTable from '.';

vi.mock('@tanstack/react-query', () => ({
  useQuery: vi.fn(),
}));

vi.mock('jotai', async (importOriginal) => {
  return {
    ...(await importOriginal<typeof import('jotai')>()),
    useAtom: vi.fn(),
  };
});

describe('CarTable', () => {
  const mockCars = [
    { id: '1', vendor: 'Tesla', model: 'Model S', available: true },
    { id: '2', vendor: 'Volkswagen', model: 'Golf', available: false },
  ];

  beforeEach(() => {
    vi.mocked(useQuery).mockReturnValue({ data: mockCars } as UseQueryResult);
    vi.mocked(useAtom).mockReturnValue([null, vi.fn()] as [unknown, never]);
  });

  it('should render the table with correct headers', () => {
    render(<CarTable />);
    expect(screen.getByText(/^vendor$/i)).toBeInTheDocument();
    expect(screen.getByText(/^model$/i)).toBeInTheDocument();
    expect(screen.getByText(/^available$/i)).toBeInTheDocument();
    expect(screen.getByText(/^booked by$/i)).toBeInTheDocument();
    expect(screen.getByText(/^booked at$/i)).toBeInTheDocument();
    expect(screen.getByText(/^location$/i)).toBeInTheDocument();
  });

  it('should render the correct number of rows', () => {
    render(<CarTable />);
    const rows = screen.getAllByRole('row');
    expect(rows.length).toBe(3);
  });

  it('should handle row click for unavailable car', async () => {
    const setReturnIdMock = vi.fn();
    vi.mocked(useAtom).mockReturnValue([null, setReturnIdMock] as [unknown, never]);
    const user = userEvent.setup();

    render(<CarTable />);

    const unavailableCarRow = screen.getByText('Volkswagen');
    await user.click(unavailableCarRow);

    expect(setReturnIdMock).toHaveBeenCalledWith('2');
  });

  it('handles row click for already selected unavailable car', async () => {
    const setReturnIdMock = vi.fn();
    const setReturnLocationMock = vi.fn();

    vi.mocked(useAtom)
      .mockReturnValueOnce(['2', setReturnIdMock] as [unknown, never])
      .mockReturnValueOnce([null, setReturnLocationMock] as [unknown, never]);

    const user = userEvent.setup();

    render(<CarTable />);

    const unavailableCarRow = screen.getByText('Volkswagen');
    await user.click(unavailableCarRow);

    expect(setReturnLocationMock).toHaveBeenCalledWith(null);
    expect(setReturnIdMock).toHaveBeenCalledWith(null);
  });

  it('does not handle row click for available car', async () => {
    const setReturnIdMock = vi.fn();
    vi.mocked(useAtom).mockReturnValue([null, setReturnIdMock] as [unknown, never]);
    const user = userEvent.setup();

    render(<CarTable />);

    const availableCarRow = screen.getByText('Tesla');
    await user.click(availableCarRow);

    expect(setReturnIdMock).not.toHaveBeenCalled();
  });
});
