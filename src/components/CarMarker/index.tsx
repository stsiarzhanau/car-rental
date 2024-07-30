import { AdvancedMarker, InfoWindow, useAdvancedMarkerRef } from '@vis.gl/react-google-maps';
import { clsx } from 'clsx';
import { useAtom } from 'jotai';
import { twMerge } from 'tailwind-merge';

import { rentIdAtom } from '../../atoms';
import type { Car } from '../../types';

export default function CarMarker({ id, location, vendor, model }: Partial<Car>) {
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [rentId, setRentId] = useAtom(rentIdAtom);
  const isSelectedToRent = id === rentId;

  const handleMarkerClick = (id: string) => {
    isSelectedToRent ? setRentId(null) : setRentId(id);
  };

  const handleClose = () => {
    setRentId(null);
  };

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        key={id}
        position={location}
        title={`${vendor} ${model}`}
        onClick={() => id && handleMarkerClick(id)}
      >
        <img
          src="/car.svg"
          alt="Car"
          className={twMerge(
            clsx('w-8 transition-[width] duration-200', {
              'w-12': isSelectedToRent,
            }),
          )}
        />
      </AdvancedMarker>

      {isSelectedToRent && (
        <InfoWindow anchor={marker} onClose={handleClose}>
          <div className="text-black">
            <h2 className="py-2">
              {vendor} {model}
            </h2>
          </div>
        </InfoWindow>
      )}
    </>
  );
}
