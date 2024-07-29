import { useQuery } from '@tanstack/react-query';
import { APIProvider, Map } from '@vis.gl/react-google-maps';
import { useAtom } from 'jotai';

import { returnIdAtom, returnLocationAtom } from '../../atoms';
import { getCars } from '../../requests';
import type { Car } from '../../types';
import CarMarker from '../CarMarker';

export default function CarMap() {
  const { data } = useQuery<Car[]>({ queryKey: ['cars'], queryFn: getCars });
  const [returnLocation, setReturnLocation] = useAtom(returnLocationAtom);
  const [returnId] = useAtom(returnIdAtom);

  return (
    <APIProvider
      apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string}
      onLoad={() => console.log('Maps API has loaded.')}
    >
      <Map
        mapId={import.meta.env.VITE_GOOGLE_MAPS_MAP_ID as string}
        defaultZoom={7.8}
        defaultCenter={{ lat: 24.2, lng: 54 }}
        gestureHandling="greedy"
        disableDefaultUI={true}
        onClick={({ detail }) => {
          returnId && setReturnLocation(detail.latLng);
        }}
      >
        {data?.map(({ id, location, model, vendor, available }) => {
          return available ? (
            <CarMarker key={id} id={id} location={location} model={model} vendor={vendor} />
          ) : null;
        })}

        {returnId && returnLocation && (
          <CarMarker
            key={returnId}
            id={returnId}
            location={returnLocation}
            // TODO
            model={data?.find(({ id }) => id === returnId)?.model}
            vendor={data?.find(({ id }) => id === returnId)?.vendor}
          />
        )}
      </Map>
    </APIProvider>
  );
}
