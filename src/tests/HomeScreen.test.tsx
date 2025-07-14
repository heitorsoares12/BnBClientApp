import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import HomeScreen from '../features/home/HomeScreen';
import { useUsers } from '../contexts/UsersContext';
import useDebounce from '../hooks/useDebounce';
import { filterUsers } from '../utils/filterUsers';

// Mock the useUsers hook
jest.mock('../contexts/UsersContext', () => ({
  useUsers: jest.fn(),
}));

// Mock the useDebounce hook
jest.mock('../hooks/useDebounce', () => jest.fn());

// Mock the filterUsers utility
jest.mock('../utils/filterUsers', () => ({
  filterUsers: jest.fn(),
}));

const mockUsers = [
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
];

describe('HomeScreen', () => {
  beforeEach(() => {
    // Reset mocks before each test
    (useUsers as jest.Mock).mockReset();
    (useDebounce as jest.Mock).mockReset();
    (filterUsers as jest.Mock).mockReset();

    // Default mock implementations
    (useUsers as jest.Mock).mockReturnValue({
      users: mockUsers,
      loading: false,
      error: null,
      fetchUsers: jest.fn(),
    });
    (useDebounce as jest.Mock).mockImplementation((value) => value);
    (filterUsers as jest.Mock).mockImplementation((users, searchTerm) => users);
  });

  it('renders loading indicator when data is being fetched', () => {
    (useUsers as jest.Mock).mockReturnValue({
      users: [],
      loading: true,
      error: null,
      fetchUsers: jest.fn(),
    });

    const { getByText } = render(<HomeScreen />);
    expect(getByText('Carregando usuários...')).toBeTruthy();
  });

  it('renders user list when data is loaded', async () => {
    const { getByText } = render(<HomeScreen />);

    await waitFor(() => {
      expect(getByText('John Doe')).toBeTruthy();
      expect(getByText('Jane Smith')).toBeTruthy();
    });
  });

  it('renders error message when data fetching fails', () => {
    (useUsers as jest.Mock).mockReturnValue({
      users: [],
      loading: false,
      error: 'Erro ao carregar usuários. Tente novamente.',
      fetchUsers: jest.fn(),
    });

    const { getByText } = render(<HomeScreen />);
    expect(getByText('Erro ao carregar usuários. Tente novamente.')).toBeTruthy();
  });

  it('filters users based on search term', async () => {
    const mockFetchUsers = jest.fn();
    (useUsers as jest.Mock).mockReturnValue({
      users: mockUsers,
      loading: false,
      error: null,
      fetchUsers: mockFetchUsers,
    });
    (useDebounce as jest.Mock).mockImplementation((value) => value); // Ensure debounce passes value immediately
    (filterUsers as jest.Mock).mockImplementation((users, searchTerm) => {
      if (searchTerm === 'john') return [mockUsers[0]];
      return users;
    });

    const { getByPlaceholderText, getByText, queryByText } = render(<HomeScreen />);

    fireEvent.changeText(getByPlaceholderText('Buscar por nome ou telefone...'), 'john');

    await waitFor(() => {
      expect(getByText('John Doe')).toBeTruthy();
      expect(queryByText('Jane Smith')).toBeNull();
    });
    expect(filterUsers).toHaveBeenCalledWith(mockUsers, 'john');
  });

  it('shows "Nenhum usuário encontrado" when filter returns empty', async () => {
    (useUsers as jest.Mock).mockReturnValue({
      users: mockUsers,
      loading: false,
      error: null,
      fetchUsers: jest.fn(),
    });
    (useDebounce as jest.Mock).mockImplementation((value) => value);
    (filterUsers as jest.Mock).mockImplementation(() => []); // Simulate no results

    const { getByPlaceholderText, getByText } = render(<HomeScreen />);

    fireEvent.changeText(getByPlaceholderText('Buscar por nome ou telefone...'), 'nonexistent');

    await waitFor(() => {
      expect(getByText('Nenhum usuário encontrado.')).toBeTruthy();
    });
  });

  it('calls fetchUsers on refresh', async () => {
    const mockFetchUsers = jest.fn();
    (useUsers as jest.Mock).mockReturnValue({
      users: mockUsers,
      loading: false,
      error: null,
      fetchUsers: mockFetchUsers,
    });

    const { getByTestId } = render(<HomeScreen />);

    // Simulate pull-to-refresh
    fireEvent(getByTestId('FlatList'), 'onRefresh');

    await waitFor(() => {
      expect(mockFetchUsers).toHaveBeenCalledTimes(2); // Once on mount, once on refresh
    });
  });
});
