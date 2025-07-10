import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import LoginScreen from '../features/auth/LoginScreen';
import { AuthContext } from '../contexts/AuthContext';

describe('LoginScreen', () => {
  it('shows error with wrong credentials', () => {
    const signIn = jest.fn();
    const { getByText, getByPlaceholderText } = render(
      <AuthContext.Provider value={{ isAuthenticated: false, user: null, signIn, signOut: jest.fn() }}>
        <LoginScreen />
      </AuthContext.Provider>
    );
    fireEvent.changeText(getByPlaceholderText('Usuário'), 'wrong');
    fireEvent.changeText(getByPlaceholderText('Senha'), '123');
    fireEvent.press(getByText('Entrar'));
    expect(getByText('Credenciais incorretas')).toBeTruthy();
    expect(signIn).not.toHaveBeenCalled();
  });
});
