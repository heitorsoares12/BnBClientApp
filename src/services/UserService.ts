import { api } from './api';
import { User } from '../types/user';

export async function fetchUsers(): Promise<User[]> {
  try {
    const response = await api.get('?results=10&nat=br');
    return response.data.results as User[];
  } catch (err) {
    throw err;
  }
}
