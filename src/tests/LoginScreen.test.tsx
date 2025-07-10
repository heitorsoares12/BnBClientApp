import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import LoginScreen from '../features/auth/LoginScreen';
import {AuthProvider} from '../contexts/AuthContext';

describe('LoginScreen', () => {
  it('shows error on wrong credentials', () => {
    const {getByPlaceholderText, getByText} = render(
      <AuthProvider>
        <LoginScreen />
      </AuthProvider>,
    );
    fireEvent.changeText(getByPlaceholderText('Usuário'), 'bad');
    fireEvent.changeText(getByPlaceholderText('Senha'), 'wrong');
    fireEvent.press(getByText('Entrar'));
    expect(getByText('Credenciais incorretas')).toBeTruthy();
  });
});
