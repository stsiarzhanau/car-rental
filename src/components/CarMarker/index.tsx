import { AdvancedMarker, InfoWindow, useAdvancedMarkerRef } from '@vis.gl/react-google-maps';
import { clsx } from 'clsx';
import { useAtom } from 'jotai';

import { rentIdAtom } from '../../atoms';
import type { Car } from '../../types';

export default function CarMarker({ id, location, vendor, model }: Partial<Car>) {
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [rentId, setRentId] = useAtom(rentIdAtom);

  const handleMarkerClick = (id: string) => {
    id === rentId ? setRentId(null) : setRentId(id);
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
          className={clsx('w-8 transition-[width] duration-200', {
            'w-12': id === rentId,
          })}
        />
      </AdvancedMarker>

      {id === rentId && (
        <InfoWindow anchor={marker} onClose={handleClose}>
          <div className="text-black">
            <h2>
              {vendor} {model}
            </h2>
          </div>
        </InfoWindow>
      )}
    </>
  );
}
