import { delay, http, HttpResponse } from 'msw';

import { Location } from '../types';
import cars from './mockCarsData';

export const handlers = [
  http.get(`api/cars`, async () => {
    await delay();
    return HttpResponse.json(cars);
  }),

  http.post('api/rent/:id', async ({ request, params }) => {
    const { id } = params;
    const requestBody = await request.json();
    const { name } = requestBody as { name: string };
    const car = cars.find((car) => car.id === id);

    if (car?.available) {
      car.available = false;
      car.bookedAt = new Date();
      car.bookedBy = name;
    }

    await delay();
    return HttpResponse.json(cars);
  }),

  http.post('api/return/:id', async ({ request, params }) => {
    const { id } = params;
    const requestBody = await request.json();
    const { lat, lng } = requestBody as Location;
    const car = cars.find((car) => car.id === id);

    if (car && !car.available) {
      car.available = true;
      car.bookedAt = undefined;
      car.bookedBy = undefined;
      car.location.lat = lat;
      car.location.lng = lng;
    }

    await delay();
    return HttpResponse.json(cars);
  }),
];
