import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';

import { getCars } from '../../requests';
import { Car, SelectFunction } from '../../types';

export const useCars = <TOutput>(select: SelectFunction<Car[], TOutput>) =>
  useQuery<Car[], unknown, TOutput>({
    queryKey: ['cars'],
    queryFn: getCars,
    select,
  });

export const useAllCarsAvailable = () =>
  useCars(useCallback((data) => data.every((car) => car.available), []));

export const useAllCarsRented = () =>
  useCars(useCallback((data) => data.every((car) => !car.available), []));
