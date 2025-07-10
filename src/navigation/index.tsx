import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import {useAuth} from '../contexts/AuthContext';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const Navigation = () => {
  const {isAuthenticated} = useAuth();
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {isAuthenticated ? <AppStack /> : <AuthStack />}
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default Navigation;
