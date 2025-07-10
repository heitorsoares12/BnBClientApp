import api from './api';
import {User} from '../types/user';

export async function fetchUsers(): Promise<User[]> {
  try {
    const response = await api.get('api/?results=10&nat=br');
    return response.data.results.map((item: any) => ({
      name: {first: item.name.first, last: item.name.last},
      phone: item.phone,
      picture: {thumbnail: item.picture.thumbnail},
      location: {
        coordinates: {
          latitude: item.location.coordinates.latitude,
          longitude: item.location.coordinates.longitude,
        },
        city: item.location.city,
      },
    }));
  } catch (err) {
    throw new Error('Erro ao buscar usuários');
  }
}
