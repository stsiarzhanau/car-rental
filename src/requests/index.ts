import { Car, Location } from '../types';
import { request } from './request';

export async function getCars() {
  return request<Car[]>('api/cars');
}

export async function rentCar(data: { id: string; name: string }) {
  const { id, name } = data;
  return request<Car[]>(`api/rent/${id}`, 'POST', { name });
}

export async function returnCar(data: { id: string; location: Location }) {
  const { id, location } = data;
  return request<Car[]>(`api/return/${id}`, 'POST', location);
}
