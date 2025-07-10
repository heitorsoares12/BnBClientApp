import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../features/home/HomeScreen';
import NewUserScreen from '../features/cadastro/NewUserScreen';

export type HomeStackParamList = {
  Home: undefined;
  NewUser: undefined;
};

const Stack = createStackNavigator<HomeStackParamList>();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Clientes' }} />
      <Stack.Screen name="NewUser" component={NewUserScreen} options={{ title: 'Novo Cliente' }} />
    </Stack.Navigator>
  );
}
