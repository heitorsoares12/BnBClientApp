import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useAuth} from '../../contexts/AuthContext';
import {COLORS, SPACING} from '../../styles/theme';

const LoginScreen = () => {
  const {signIn} = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
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
  };

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
      {!!error && <Text style={styles.error}>{error}</Text>}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: SPACING,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: SPACING,
    paddingHorizontal: SPACING,
    height: 40,
  },
  button: {
    backgroundColor: COLORS.PRIMARY,
    padding: SPACING,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  error: {
    color: COLORS.ERROR,
    marginBottom: SPACING,
    textAlign: 'center',
  },
});

export default LoginScreen;
