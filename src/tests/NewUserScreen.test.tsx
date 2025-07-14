import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import NewUserScreen from '../features/cadastro/NewUserScreen';
import { useUsers } from '../contexts/UsersContext';
import { Alert } from 'react-native';

// Mock the useUsers hook
jest.mock('../contexts/UsersContext', () => ({
  useUsers: () => ({
    addUser: jest.fn(),
  }),
}));

// Mock navigation
const mockNavigation = {
  goBack: jest.fn(),
};

// Mock Alert
jest.mock('react-native', () => ({
  ...jest.requireActual('react-native'),
  Alert: {
    alert: jest.fn(),
  },
}));

describe('NewUserScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { getByPlaceholderText, getByText } = render(
      <NewUserScreen navigation={mockNavigation as any} />
    );

    expect(getByPlaceholderText('Nome')).toBeTruthy();
    expect(getByPlaceholderText('Sobrenome')).toBeTruthy();
    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Telefone (ex: (XX) XXXXX-XXXX)')).toBeTruthy();
    expect(getByText('Salvar Cliente')).toBeTruthy();
  });

  it('shows validation errors for empty fields', async () => {
    const { getByText } = render(
      <NewUserScreen navigation={mockNavigation as any} />
    );

    fireEvent.press(getByText('Salvar Cliente'));

    await waitFor(() => {
      expect(getByText('Nome é obrigatório')).toBeTruthy();
      expect(getByText('Sobrenome é obrigatório')).toBeTruthy();
      expect(getByText('Email é obrigatório')).toBeTruthy();
      expect(getByText('Telefone é obrigatório')).toBeTruthy();
    });
  });

  it('shows validation errors for invalid email and phone', async () => {
    const { getByPlaceholderText, getByText } = render(
      <NewUserScreen navigation={mockNavigation as any} />
    );

    fireEvent.changeText(getByPlaceholderText('Nome'), 'Test');
    fireEvent.changeText(getByPlaceholderText('Sobrenome'), 'User');
    fireEvent.changeText(getByPlaceholderText('Email'), 'invalid-email');
    fireEvent.changeText(getByPlaceholderText('Telefone (ex: (XX) XXXXX-XXXX)'), '123');

    fireEvent.press(getByText('Salvar Cliente'));

    await waitFor(() => {
      expect(getByText('Email inválido')).toBeTruthy();
      expect(getByText('Telefone inválido')).toBeTruthy();
    });
  });

  it('calls addUser and navigates back on successful submission', async () => {
    const { getByPlaceholderText, getByText } = render(
      <NewUserScreen navigation={mockNavigation as any} />
    );

    fireEvent.changeText(getByPlaceholderText('Nome'), 'Novo');
    fireEvent.changeText(getByPlaceholderText('Sobrenome'), 'Cliente');
    fireEvent.changeText(getByPlaceholderText('Email'), 'novo.cliente@example.com');
    fireEvent.changeText(getByPlaceholderText('Telefone (ex: (XX) XXXXX-XXXX)'), '(11) 98765-4321');

    fireEvent.press(getByText('Salvar Cliente'));

    const { addUser } = useUsers();

    await waitFor(() => {
      expect(addUser).toHaveBeenCalledTimes(1);
      expect(Alert.alert).toHaveBeenCalledWith('Sucesso', 'Novo cliente adicionado!');
      expect(mockNavigation.goBack).toHaveBeenCalledTimes(1);
    });
  });
});
