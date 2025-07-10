import React, { useContext, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { AuthContext } from '../../contexts/AuthContext';
import { COLORS, SPACING } from '../../styles/theme';

export default function LoginScreen() {
  const { signIn } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleLogin() {
    if (!username || !password) {
      setError('Preencha usuário e senha');
      return;
    }
    if (username === 'user' && password === '123') {
      setError('');
      signIn(username, password);
    } else {
      setError('Credenciais incorretas');
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Usuário"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button title="Entrar" onPress={handleLogin} accessibilityLabel="Botão de Entrar" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: SPACING,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: SPACING,
    padding: SPACING / 2,
  },
  error: {
    color: COLORS.ERROR,
    marginBottom: SPACING,
  },
});
