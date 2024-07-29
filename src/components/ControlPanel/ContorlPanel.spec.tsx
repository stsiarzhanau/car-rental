import { UseMutationResult } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { Provider } from 'jotai';
import { toast } from 'sonner';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import ControlPanel from './index';

const customRender = (ui: React.ReactElement) => {
  return render(<Provider>{ui}</Provider>);
};

vi.mock('@tanstack/react-query', async () => {
  const actual = await vi.importActual('@tanstack/react-query');
  return {
    ...actual,
    useMutation: vi.fn(),
    useQueryClient: vi.fn(),
  };
});

vi.mock('jotai', async () => {
  const actual = await vi.importActual('jotai');
  return {
    ...actual,
    useAtom: vi.fn(),
  };
});

vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    info: vi.fn(),
  },
}));

vi.mock('../../requests', () => ({
  rentCar: vi.fn(),
  returnCar: vi.fn(),
}));

const { useMutation } = await import('@tanstack/react-query');
const { useAtom } = await import('jotai');

describe('ControlPanel', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    vi.mocked(useAtom).mockReturnValue([null, vi.fn()] as [unknown, never]);
    vi.mocked(useMutation).mockReturnValue({ mutate: vi.fn() } as unknown as UseMutationResult);
  });

  it('renders rent and return buttons and name input', () => {
    customRender(<ControlPanel />);

    expect(screen.getByText('Rent')).toBeInTheDocument();
    expect(screen.getByText('Return')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your name')).toBeInTheDocument();
  });

  it('handles name input change', async () => {
    customRender(<ControlPanel />);

    const input = screen.getByPlaceholderText('Enter your name');
    await user.type(input, 'John Doe');
    expect(input).toHaveValue('John Doe');
  });

  describe('Rent button click handler', () => {
    it('shows proper info toast when no car is selected and no name is entered', async () => {
      const mockMutate = vi.fn();

      vi.mocked(useMutation).mockReturnValue({
        mutate: mockMutate,
      } as unknown as UseMutationResult);

      customRender(<ControlPanel />);

      await user.click(screen.getByText('Rent'));

      expect(toast.info).toHaveBeenCalledWith(
        'Please enter your name and select the desired car on the map',
      );

      expect(mockMutate).not.toHaveBeenCalled();
    });

    it('shows proper info toast when a car is selected but no name is entered', async () => {
      const mockMutate = vi.fn();

      vi.mocked(useMutation).mockReturnValue({
        mutate: mockMutate,
      } as unknown as UseMutationResult);

      vi.mocked(useAtom).mockReturnValue(['1', vi.fn()] as [unknown, never]);

      customRender(<ControlPanel />);

      await user.click(screen.getByText('Rent'));
      expect(toast.info).toHaveBeenCalledWith('Please enter your name');
      expect(mockMutate).not.toHaveBeenCalled();
    });

    it('shows proper info toast when a name is entered but no car is selected', async () => {
      const mockMutate = vi.fn();

      vi.mocked(useMutation).mockReturnValue({
        mutate: mockMutate,
      } as unknown as UseMutationResult);

      customRender(<ControlPanel />);

      await user.type(screen.getByPlaceholderText('Enter your name'), 'John Doe');
      await user.click(screen.getByText('Rent'));
      expect(toast.info).toHaveBeenCalledWith('Please select the desired car on the map');
      expect(mockMutate).not.toHaveBeenCalled();
    });

    it('calls rentCar mutation when both name and car are provided and shows success toast after successful rent operation', async () => {
      const mockMutate = vi.fn();

      vi.mocked(useMutation).mockReturnValue({
        mutate: mockMutate,
      } as unknown as UseMutationResult);

      vi.mocked(useAtom).mockReturnValue(['1', vi.fn()] as [unknown, never]);

      customRender(<ControlPanel />);

      await user.type(screen.getByPlaceholderText('Enter your name'), 'John Doe');
      await user.click(screen.getByText('Rent'));

      expect(mockMutate).toHaveBeenCalledWith({ id: '1', name: 'John Doe' });
    });
  });

  describe('Return button click handler', () => {
    it('shows info toast when no car is selected and no location is specified', async () => {
      customRender(<ControlPanel />);

      await user.click(screen.getByText('Return'));

      expect(toast.info).toHaveBeenCalledWith(
        'Please select the car you want to return by clicking on the corresponding table row and then specify the return location on the map',
      );
    });
  });
});
