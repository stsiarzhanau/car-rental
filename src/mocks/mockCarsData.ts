import type { Car } from '../types';

const mockCarData: Car[] = [
  {
    id: '1',
    model: 'Model 3',
    vendor: 'Tesla',
    available: true,
    location: { lat: 24.451911, lng: 54.396798 },
  },
  {
    id: '2',
    model: 'Golf',
    vendor: 'Wolkswagen',
    available: true,
    location: { lat: 24.416351, lng: 54.472487 },
  },
  {
    id: '3',
    model: 'Polo',
    vendor: 'Wolkswagen',
    available: true,
    location: { lat: 24.232356, lng: 55.683816 },
  },
  {
    id: '4',
    model: 'Polo',
    vendor: 'Wolkswagen',
    available: true,
    location: { lat: 25.219174, lng: 55.289203 },
  },
  {
    id: '5',
    model: 'Polo',
    vendor: 'Wolkswagen',
    available: true,
    location: { lat: 25.224964, lng: 55.281729 },
  },
  {
    id: '6',
    model: 'Range Rover',
    vendor: 'Land Rover',
    available: true,
    location: { lat: 25.336763, lng: 55.388467 },
  },
  {
    id: '7',
    model: '911',
    vendor: 'Porsche',
    available: true,
    location: { lat: 24.44057, lng: 54.57611 },
  },
];

export default mockCarData;
