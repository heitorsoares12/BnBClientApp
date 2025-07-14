
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, useColorScheme, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { getColors } from '../../styles/theme';

const loginSchema = yup.object().shape({
  username: yup.string().required('Usuário é obrigatório'),
  password: yup.string().required('Senha é obrigatória'),
});

type FormData = yup.InferType<typeof loginSchema>;

const LoginScreen = () => {
  const { signIn } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const scheme = useColorScheme();
  const colors = getColors(scheme);

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(loginSchema),
  });

  const handleLogin = async (data: FormData) => {
    setError(null);
    const success = await signIn(data.username, data.password);
    if (!success) {
      setError('Credenciais inválidas.');
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f0f2f5',
      padding: 20,
    },
    card: {
      backgroundColor: '#FFFFFF',
      borderRadius: 16,
      padding: 24,
      width: '100%',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 5,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#00573F',
      textAlign: 'center',
      marginBottom: 32,
    },
    input: {
      height: 55,
      borderColor: '#00573F',
      borderWidth: 1.5,
      borderRadius: 8,
      marginBottom: 16,
      paddingHorizontal: 16,
      fontSize: 16,
      color: colors.text,
      backgroundColor: colors.card,
    },
    button: {
      backgroundColor: '#F7941D',
      borderRadius: 8,
      height: 55,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonText: {
      color: '#FFFFFF',
      fontWeight: 'bold',
      fontSize: 16,
      textTransform: 'uppercase',
    },
    errorText: {
      color: colors.notification,
      textAlign: 'center',
      marginBottom: 12,
      minHeight: 20,
    },
    errorPlaceholder: {
      minHeight: 20,
      marginBottom: 12,
    },
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Seja bem vindo!</Text>

        {error && <Text style={styles.errorText}>{error}</Text>}

        <Controller
          control={control}
          name="username"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Usuário"
              placeholderTextColor="#999"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              autoCapitalize="none"
            />
          )}
        />
        {errors.username && <Text style={styles.errorText}>{errors.username.message}</Text>}

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Senha"
              placeholderTextColor="#999"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry
            />
          )}
        />
        {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}

        <TouchableOpacity style={styles.button} onPress={handleSubmit(handleLogin)} accessibilityLabel="Botão de Entrar">
          <Text style={styles.buttonText}>ENTRAR</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
