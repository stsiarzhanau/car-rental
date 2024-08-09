import { useMutation, UseMutationResult, UseQueryResult } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { toast } from 'sonner';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { rentIdAtom, returnIdAtom, returnLocationAtom } from '../../atoms';
import { renderWithJotaiProvider } from '../../test-utils';
import { useAllCarsAvailable, useAllCarsRented } from './hooks';
import ControlPanel from './index';

vi.mock('@tanstack/react-query', () => ({
  useMutation: vi.fn(),
  useQueryClient: vi.fn(),
}));

vi.mock('./hooks', () => ({
  useAllCarsAvailable: vi.fn(),
  useAllCarsRented: vi.fn(),
}));

vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    info: vi.fn(),
  },
}));

describe('ControlPanel', () => {
  let user: ReturnType<typeof userEvent.setup>;
  const mockMutate = vi.fn();

  beforeEach(() => {
    user = userEvent.setup();
    vi.mocked(useMutation).mockReturnValue({ mutate: mockMutate } as unknown as UseMutationResult);

    vi.mocked(useAllCarsAvailable).mockReturnValue({ data: false } as UseQueryResult<
      boolean,
      unknown
    >);

    vi.mocked(useAllCarsRented).mockReturnValue({ data: false } as UseQueryResult<
      boolean,
      unknown
    >);
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('renders rent and return buttons and name input', () => {
    render(<ControlPanel />);

    expect(screen.getByText('Rent')).toBeInTheDocument();
    expect(screen.getByText('Return')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your name')).toBeInTheDocument();
  });

  it('handles name input change', async () => {
    render(<ControlPanel />);

    const input = screen.getByPlaceholderText('Enter your name');
    await user.type(input, 'John Doe');
    expect(input).toHaveValue('John Doe');
  });

  describe('Rent button click handler', () => {
    it('shows proper info toast when no car is selected and no name is entered', async () => {
      renderWithJotaiProvider([[rentIdAtom, null]], <ControlPanel />);

      await user.click(screen.getByText('Rent'));

      expect(toast.info).toHaveBeenCalledWith(
        'Please enter your name and select the desired car on the map',
      );

      expect(mockMutate).not.toHaveBeenCalled();
    });

    it('shows proper info toast when a car is selected but no name is entered', async () => {
      renderWithJotaiProvider([[rentIdAtom, '1']], <ControlPanel />);

      await user.click(screen.getByText('Rent'));
      expect(toast.info).toHaveBeenCalledWith('Please enter your name');
      expect(mockMutate).not.toHaveBeenCalled();
    });

    it('shows proper info toast when a name is entered but no car is selected', async () => {
      renderWithJotaiProvider([[rentIdAtom, null]], <ControlPanel />);

      await user.type(screen.getByPlaceholderText('Enter your name'), 'John Doe');
      await user.click(screen.getByText('Rent'));
      expect(toast.info).toHaveBeenCalledWith('Please select the desired car on the map');
      expect(mockMutate).not.toHaveBeenCalled();
    });

    it('calls rentCar mutation when both name and car are provided and shows success toast after successful rent operation', async () => {
      renderWithJotaiProvider([[rentIdAtom, '1']], <ControlPanel />);

      await user.type(screen.getByPlaceholderText('Enter your name'), 'John Doe');
      await user.click(screen.getByText('Rent'));

      expect(mockMutate).toHaveBeenCalledWith({ id: '1', name: 'John Doe' });
    });
  });

  describe('Return button click handler', () => {
    it('shows proper info toast when no car is selected and no location is specified', async () => {
      renderWithJotaiProvider(
        [
          [returnIdAtom, null],
          [returnLocationAtom, null],
        ],
        <ControlPanel />,
      );

      await user.click(screen.getByText('Return'));

      expect(toast.info).toHaveBeenCalledWith(
        'Please select the car you want to return by clicking on the corresponding table row and then specify the return location on the map',
      );
      expect(mockMutate).not.toHaveBeenCalled();
    });

    it('shows proper info toast when a car is selected but no location is specified', async () => {
      renderWithJotaiProvider(
        [
          [returnIdAtom, '1'],
          [returnLocationAtom, null],
        ],
        <ControlPanel />,
      );

      await user.click(screen.getByText('Return'));

      expect(toast.info).toHaveBeenCalledWith('Please specify the return location on the map');
      expect(mockMutate).not.toHaveBeenCalled();
    });

    it('calls returnCar mutation when both car and location are provided', async () => {
      renderWithJotaiProvider(
        [
          [returnIdAtom, '1'],
          [returnLocationAtom, { lat: 1, lng: 1 }],
        ],
        <ControlPanel />,
      );

      await user.click(screen.getByText('Return'));

      expect(mockMutate).toHaveBeenCalledWith({ id: '1', location: { lat: 1, lng: 1 } });
    });

    it('shows proper info toast when all cars have been returned', async () => {
      vi.mocked(useAllCarsAvailable).mockReturnValue({ data: true } as UseQueryResult<
        boolean,
        unknown
      >);

      render(<ControlPanel />);

      await user.click(screen.getByText('Return'));

      expect(toast.info).toHaveBeenCalledWith('At the moment, all cars have been returned');
    });

    it('shows proper info toast when all cars have already been rented', async () => {
      vi.mocked(useAllCarsRented).mockReturnValue({ data: true } as UseQueryResult<
        boolean,
        unknown
      >);

      render(<ControlPanel />);

      await user.click(screen.getByText('Rent'));

      expect(toast.info).toHaveBeenCalledWith(
        'Unfortunately, due to high demand, all our cars have already been rented',
      );
    });
  });
});
