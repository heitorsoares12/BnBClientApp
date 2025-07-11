import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
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
    <KeyboardAvoidingView
        // Ajusta a tela para o teclado não cobrir os inputs
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Seja bem vindo!</Text>

        <TextInput
          style={styles.input}
          placeholder="Login"
          value={username}
          onChangeText={setUsername}
          placeholderTextColor="#999"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor="#999"
        />

        <TouchableOpacity style={styles.forgotPasswordContainer}>
             <Text style={styles.forgotPasswordText}>Redefinir senha</Text>
        </TouchableOpacity>

        {/* Exibe a mensagem de erro ou um espaço reservado para evitar que o layout "pule" */}
        {error ? <Text style={styles.error}>{error}</Text> : <View style={styles.errorPlaceholder} />}

        <TouchableOpacity style={styles.button} onPress={handleLogin} accessibilityLabel="Botão de Entrar">
            <Text style={styles.buttonText}>ENTRAR</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

// OBS: Os valores de cores (ex: '#F7941D') foram extraídos da imagem.
// É uma boa prática substituí-los pelas variáveis do seu arquivo de tema (ex: COLORS.accent).
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f2f5', // Fundo cinza claro para destacar o card
    padding: SPACING || 20, // Usa o espaçamento do tema ou um valor padrão
  },
  card: {
    backgroundColor: '#FFFFFF', // ou COLORS.white
    borderRadius: 16,
    padding: SPACING ? SPACING * 1.5 : 24,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5, // Sombra para Android
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00573F', // Verde escuro da imagem (substituir por COLORS.primary)
    textAlign: 'center',
    marginBottom: SPACING ? SPACING * 2 : 32,
  },
  input: {
    height: 55,
    borderColor: '#00573F', // Borda verde escura
    borderWidth: 1.5,
    borderRadius: 8,
    marginBottom: SPACING || 16,
    paddingHorizontal: SPACING || 16,
    fontSize: 16,
  },
  forgotPasswordContainer: {
    alignSelf: 'center',
    marginBottom: SPACING ? SPACING / 2 : 8,
  },
  forgotPasswordText: {
    color: '#555',
    fontSize: 14,
  },
  button: {
    backgroundColor: '#F7941D', // Laranja da imagem (substituir por COLORS.accent)
    borderRadius: 8,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF', // ou COLORS.white
    fontWeight: 'bold',
    fontSize: 16,
    textTransform: 'uppercase',
  },
  error: {
    color: COLORS.ERROR || 'red', // Cor de erro do tema ou vermelho padrão
    textAlign: 'center',
    marginBottom: 12,
    minHeight: 20,
  },
  errorPlaceholder: {
    minHeight: 20,
    marginBottom: 12,
  }
});

export default LoginScreen;
