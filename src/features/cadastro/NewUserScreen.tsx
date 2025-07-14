import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import { useUsers } from '../../contexts/UsersContext';
import { User } from '../../types/user';
import { SPACING } from '../../styles/theme';
import { useNavigation } from '@react-navigation/native';
import uuid from 'react-native-uuid';


interface FormData {
  fullName: string;
  phone: string;
  email: string;
}

const schema = yup.object().shape({
  fullName: yup
    .string()
    .required('Nome é obrigatório')
    .min(3, 'Nome deve ter ao menos 3 letras'),
  phone: yup.string().required('Telefone é obrigatório'),
  email: yup
    .string()
    .email('E-mail inválido')
    .required('E-mail é obrigatório'),
});

const NewUserScreen = () => {
  const { addUser } = useUsers();
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: { fullName: '', phone: '', email: '' },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    try {
      const [first, ...rest] = data.fullName.trim().split(' ');
      const last = rest.join(' ');

      const newUser: User = {
        login: {
          uuid: uuid.v4(),
        },
        name: { first, last: last || first },
        phone: data.phone,
        email: data.email,
        picture: {
          large: 'https://randomuser.me/api/portraits/men/1.jpg',
          thumbnail: 'https://randomuser.me/api/portraits/thumb/men/1.jpg',
        },
        location: {
          coordinates: {
            latitude: '-23.5505',
            longitude: '-46.6333',
          },
        },
      };

      addUser(newUser);
      navigation.navigate('UserScreen');
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao criar o usuário.');
    }
  };

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="fullName"
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Nome Completo"
            value={value}
            onChangeText={onChange}
            style={styles.input}
          />
        )}
      />
      {errors.fullName && (
        <Text style={styles.error}>{errors.fullName.message}</Text>
      )}

      <Controller
        control={control}
        name="phone"
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Telefone"
            value={value}
            onChangeText={onChange}
            style={styles.input}
            keyboardType="phone-pad"
          />
        )}
      />
      {errors.phone && <Text style={styles.error}>{errors.phone.message}</Text>}

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="E-mail"
            value={value}
            onChangeText={onChange}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        )}
      />
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

      <TouchableOpacity
        style={[styles.button, isSubmitting && styles.buttonDisabled]}
        onPress={handleSubmit(onSubmit)}
        disabled={isSubmitting}>
        <Text style={styles.buttonText}>Salvar Cliente</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING,
    backgroundColor: '#f5f5f5',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: SPACING,
    paddingHorizontal: SPACING,
    height: 50,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#00573F',
    padding: SPACING,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: SPACING,
  },
  buttonDisabled: {
    backgroundColor: '#aaa',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  error: {
    color: '#ff0000',
    marginBottom: SPACING / 2,
  },
});

export default NewUserScreen;