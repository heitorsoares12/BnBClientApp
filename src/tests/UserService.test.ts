import { api } from '../services/api';
import { fetchUsers } from '../services/UserService';

describe('UserService', () => {
  it('fetches users', async () => {
    const spy = jest.spyOn(api, 'get').mockResolvedValue({ data: { results: [{ name: { first: 'A', last: 'B' }, phone: '1', picture: { thumbnail: '' }, location: { coordinates: { latitude: '0', longitude: '0' } } }] } } as any);
    const users = await fetchUsers();
    expect(users).toHaveLength(1);
    spy.mockRestore();
  });
});
