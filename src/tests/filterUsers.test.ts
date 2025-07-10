import { filterUsers } from '../utils/filterUsers';

const users = [
  {
    name: { first: 'Ana', last: 'Silva' },
    phone: '1111',
    picture: { thumbnail: '' },
    location: { coordinates: { latitude: '0', longitude: '0' } },
  },
  {
    name: { first: 'Bruno', last: 'Souza' },
    phone: '2222',
    picture: { thumbnail: '' },
    location: { coordinates: { latitude: '0', longitude: '0' } },
  },
];

describe('filterUsers', () => {
  it('returns all users with empty query', () => {
    expect(filterUsers(users, '')).toHaveLength(2);
  });
  it('filters by name', () => {
    expect(filterUsers(users, 'ana')).toHaveLength(1);
  });
  it('filters by phone', () => {
    expect(filterUsers(users, '2222')).toHaveLength(1);
  });
});
