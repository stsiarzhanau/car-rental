import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { forwardRef } from 'react';
import { describe, expect, it, vi } from 'vitest';

import CarMarker from '.';

vi.mock('@vis.gl/react-google-maps', () => ({
  useAdvancedMarkerRef: vi.fn(() => [vi.fn(), { current: null }]),
  // eslint-disable-next-line react/display-name
  AdvancedMarker: forwardRef<HTMLDivElement, React.PropsWithChildren>((props, ref) => (
    <div ref={ref} {...props} data-testid="advanced-marker">
      {props.children}
    </div>
  )),
  InfoWindow: (props: React.PropsWithChildren) => (
    <div {...props} data-testid="info-window">
      {props.children}
    </div>
  ),
}));

describe('CarMarker', () => {
  it('should render a marker with a car image', () => {
    render(
      <CarMarker
        id="1"
        location={{ lat: 24.451911, lng: 54.396798 }}
        vendor="Tesla"
        model="Model S"
      />,
    );

    expect(screen.getByAltText('Car')).toBeInTheDocument();
  });

  it('should toggle InfoWindow when marker is clicked', async () => {
    const user = userEvent.setup();

    render(
      <CarMarker
        id="1"
        location={{ lat: 24.451911, lng: 54.396798 }}
        vendor="Tesla"
        model="Model S"
      />,
    );

    await user.click(screen.getByTestId('advanced-marker'));
    expect(screen.getByTestId('info-window')).toBeInTheDocument();
    expect(screen.getByText('Tesla Model S')).toBeInTheDocument();

    await user.click(screen.getByTestId('advanced-marker'));
    expect(screen.queryByTestId('info-window')).not.toBeInTheDocument();
    expect(screen.queryByText('Tesla Model S')).not.toBeInTheDocument();
  });
});
