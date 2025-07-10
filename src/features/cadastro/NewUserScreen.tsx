import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useUsers} from '../../contexts/UsersContext';
import {User} from '../../types/user';
import {COLORS, SPACING} from '../../styles/theme';
import {useNavigation} from '@react-navigation/native';

interface FormData {
  nome: string;
  telefone: string;
}

const schema = yup.object().shape({
  nome: yup.string().required('Nome é obrigatório').min(3, 'Nome deve ter ao menos 3 letras'),
  telefone: yup.string().required('Telefone é obrigatório'),
});

const NewUserScreen = () => {
  const {addUser} = useUsers();
  const navigation = useNavigation();
  const {control, handleSubmit, formState: {errors}} = useForm<FormData>({
    defaultValues: {nome: '', telefone: ''},
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    const [first, ...rest] = data.nome.trim().split(' ');
    const last = rest.join(' ');
    const newUser: User = {
      name: {first, last},
      phone: data.telefone,
      picture: {thumbnail: 'https://placehold.co/100'},
      location: {
        coordinates: {
          latitude: (Math.random() * (5 + 34) - 34).toString(),
          longitude: (-35 - Math.random() * 39).toString(),
        },
      },
    };
    addUser(newUser);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="nome"
        render={({field: {onChange, value}}) => (
          <TextInput
            placeholder="Nome"
            value={value}
            onChangeText={onChange}
            style={styles.input}
          />
        )}
      />
      {errors.nome && <Text style={styles.error}>{errors.nome.message}</Text>}
      <Controller
        control={control}
        name="telefone"
        render={({field: {onChange, value}}) => (
          <TextInput
            placeholder="Telefone"
            value={value}
            onChangeText={onChange}
            style={styles.input}
          />
        )}
      />
      {errors.telefone && <Text style={styles.error}>{errors.telefone.message}</Text>}
      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginTop: SPACING,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  error: {
    color: COLORS.ERROR,
    marginBottom: SPACING / 2,
  },
});

export default NewUserScreen;
