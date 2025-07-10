import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../features/auth/LoginScreen';

export type AuthStackParamList = {
  Login: undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();

const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={{headerShown: false}}
    />
  </Stack.Navigator>
);

export default AuthStack;
