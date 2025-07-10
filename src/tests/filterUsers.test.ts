import filterUsers from '../utils/filterUsers';
import {User} from '../types/user';

describe('filterUsers', () => {
  const users: User[] = [
    {
      name: {first: 'Ana', last: 'Silva'},
      phone: '1111',
      picture: {thumbnail: ''},
      location: {coordinates: {latitude: '0', longitude: '0'}},
    },
    {
      name: {first: 'Bruno', last: 'Souza'},
      phone: '2222',
      picture: {thumbnail: ''},
      location: {coordinates: {latitude: '0', longitude: '0'}},
    },
  ];

  it('returns all when query empty', () => {
    expect(filterUsers(users, '')).toHaveLength(2);
  });

  it('filters by name', () => {
    const result = filterUsers(users, 'ana');
    expect(result).toHaveLength(1);
    expect(result[0].name.first).toBe('Ana');
  });

  it('filters by phone', () => {
    const result = filterUsers(users, '2222');
    expect(result).toHaveLength(1);
    expect(result[0].phone).toBe('2222');
  });
});
