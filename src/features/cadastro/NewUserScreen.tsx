import React, { useContext } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { UsersContext } from '../../contexts/UsersContext';
import { SPACING } from '../../styles/theme';
import { StackScreenProps } from '@react-navigation/stack';
import { HomeStackParamList } from '../../navigation/HomeStack';

const schema = yup.object({
  nome: yup.string().required('Nome é obrigatório').min(3, 'Nome deve ter ao menos 3 letras'),
  telefone: yup.string().required('Telefone é obrigatório'),
});

type FormData = {
  nome: string;
  telefone: string;
};

type Props = StackScreenProps<HomeStackParamList, 'NewUser'>;

export default function NewUserScreen({ navigation }: Props) {
  const { addUser } = useContext(UsersContext);
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  function onSubmit(data: FormData) {
    const [first, ...rest] = data.nome.trim().split(' ');
    const last = rest.join(' ');
    const newUser = {
      name: { first, last },
      phone: data.telefone,
      picture: { thumbnail: 'https://placekitten.com/100/100' },
      location: {
        coordinates: {
          latitude: (Math.random() * (5 + 34) - 34).toString(),
          longitude: (-35 - Math.random() * 39).toString(),
        },
      },
    };
    addUser(newUser);
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="nome"
        render={({ field: { onChange, value } }) => (
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
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Telefone"
            value={value}
            onChangeText={onChange}
            style={styles.input}
          />
        )}
      />
      {errors.telefone && <Text style={styles.error}>{errors.telefone.message}</Text>}
      <Button title="Salvar" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: SPACING,
    padding: SPACING / 2,
  },
  error: {
    color: 'red',
    marginBottom: SPACING,
  },
});
