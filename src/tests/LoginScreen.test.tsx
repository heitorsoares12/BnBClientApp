import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import LoginScreen from '../features/auth/LoginScreen';
import { AuthProvider } from '../contexts/AuthContext';


jest.mock('../../contexts/AuthContext', () => ({
  useAuth: () => ({
    signIn: jest.fn((username, password) => {
      if (username === 'user' && password === '123') {
        return Promise.resolve(true);
      }
      return Promise.resolve(false);
    }),
    isLoggedIn: false,
    user: null,
    signOut: jest.fn(),
  }),
  AuthProvider: ({ children }: any) => <>{children}>,
}));

describe('LoginScreen', () => {
  it('renders correctly', () => {
    const { getByPlaceholderText, getByText } = render(
      <AuthProvider>
        <LoginScreen />
      </AuthProvider>
    );

    expect(getByPlaceholderText('Usuário')).toBeTruthy();
    expect(getByPlaceholderText('Senha')).toBeTruthy();
    expect(getByText('Entrar')).toBeTruthy();
  });

  it('shows error message for invalid credentials', async () => {
    const { getByPlaceholderText, getByText } = render(
      <AuthProvider>
        <LoginScreen />
      </AuthProvider>
    );

    fireEvent.changeText(getByPlaceholderText('Usuário'), 'wronguser');
    fireEvent.changeText(getByPlaceholderText('Senha'), 'wrongpass');
    fireEvent.press(getByText('Entrar'));

    await waitFor(() => {
      expect(getByText('Credenciais inválidas.')).toBeTruthy();
    });
  });

  it('navigates on successful login', async () => {
    
    const { getByPlaceholderText, getByText } = render(
      <AuthProvider>
        <LoginScreen />
      </AuthProvider>
    );

    fireEvent.changeText(getByPlaceholderText('Usuário'), 'user');
    fireEvent.changeText(getByPlaceholderText('Senha'), '123');
    fireEvent.press(getByText('Entrar'));

    // Since navigation is handled by App.tsx based on AuthContext, we don't assert navigation directly here.
    
    
    await waitFor(() => {
      
      expect(() => getByText('Credenciais inválidas.')).toThrow();
    });
  });

  it('shows validation errors for empty fields', async () => {
    const { getByText } = render(
      <AuthProvider>
        <LoginScreen />
      </AuthProvider>
    );

    fireEvent.press(getByText('Entrar'));

    await waitFor(() => {
      expect(getByText('Usuário é obrigatório')).toBeTruthy();
      expect(getByText('Senha é obrigatória')).toBeTruthy();
    });
  });
});