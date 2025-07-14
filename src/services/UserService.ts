import api from './api';
import {User} from '../types/user';

export async function fetchUsers(count: number = 10): Promise<User[]> {
  try {
    const response = await api.get(`/?results=${count}&nat=br`);
    return response.data.results.map((item: any) => ({
      name: {first: item.name.first, last: item.name.last},
      phone: item.phone,
      picture: {thumbnail: item.picture.thumbnail},
      location: {
        coordinates: {
          latitude: (Math.random() * ((-19.0) - (-25.0)) + (-25.0)).toFixed(6),
          longitude: (Math.random() * ((-44.0) - (-53.0)) + (-53.0)).toFixed(6),
        },
        city: 'São Paulo',
      },
      email: item.email,
      login: { uuid: item.login.uuid },
    }));
  } catch (err) {
    throw new Error('Erro ao buscar usuários');
  }
}
