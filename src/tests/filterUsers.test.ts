import { filterUsers } from '../utils/filterUsers';
import { User } from '../types/user';

describe('filterUsers', () => {
  const mockUsers: User[] = [
    {
      gender: 'male',
      name: { title: 'Mr', first: 'John', last: 'Doe' },
      location: { street: { number: 1, name: 'Main St' }, city: 'Anytown', state: 'Anystate', country: 'USA', postcode: '12345', coordinates: { latitude: '0', longitude: '0' }, timezone: { offset: '+0:00', description: '' } },
      email: 'john.doe@example.com',
      phone: '11987654321',
      cell: '11987654321',
      picture: { large: '', medium: '', thumbnail: '' },
      nat: 'US',
      login: { uuid: '1' },
    },
    {
      gender: 'female',
      name: { title: 'Ms', first: 'Jane', last: 'Smith' },
      location: { street: { number: 2, name: 'Second St' }, city: 'Othertown', state: 'Otherstate', country: 'USA', postcode: '54321', coordinates: { latitude: '0', longitude: '0' }, timezone: { offset: '+0:00', description: '' } },
      email: 'jane.smith@example.com',
      phone: '22912345678',
      cell: '22912345678',
      picture: { large: '', medium: '', thumbnail: '' },
      nat: 'US',
      login: { uuid: '2' },
    },
    {
      gender: 'male',
      name: { title: 'Mr', first: 'Peter', last: 'Jones' },
      location: { street: { number: 3, name: 'Third St' }, city: 'Anytown', state: 'Anystate', country: 'USA', postcode: '67890', coordinates: { latitude: '0', longitude: '0' }, timezone: { offset: '+0:00', description: '' } },
      email: 'peter.jones@example.com',
      phone: '33998765432',
      cell: '33998765432',
      picture: { large: '', medium: '', thumbnail: '' },
      nat: 'US',
      login: { uuid: '3' },
    },
  ];

  it('should return all users if search term is empty', () => {
    const result = filterUsers(mockUsers, '');
    expect(result).toEqual(mockUsers);
  });

  it('should filter users by first name (case-insensitive)', () => {
    const result = filterUsers(mockUsers, 'john');
    expect(result).toEqual([mockUsers[0]]);
  });

  it('should filter users by last name (case-insensitive)', () => {
    const result = filterUsers(mockUsers, 'smith');
    expect(result).toEqual([mockUsers[1]]);
  });

  it('should filter users by full name (case-insensitive)', () => {
    const result = filterUsers(mockUsers, 'jane smith');
    expect(result).toEqual([mockUsers[1]]);
  });

  it('should filter users by phone number', () => {
    const result = filterUsers(mockUsers, '11987654321');
    expect(result).toEqual([mockUsers[0]]);
  });

  it('should return an empty array if no users match the search term', () => {
    const result = filterUsers(mockUsers, 'nonexistent');
    expect(result).toEqual([]);
  });

  it('should handle partial matches in name', () => {
    const result = filterUsers(mockUsers, 'jo');
    expect(result).toEqual([mockUsers[0], mockUsers[2]]);
  });

  it('should handle partial matches in phone number', () => {
    const result = filterUsers(mockUsers, '432');
    expect(result).toEqual([mockUsers[0], mockUsers[2]]);
  });
});