import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import { AuthProvider, useAuth } from './src/contexts/AuthContext';
import { UsersProvider } from './src/contexts/UsersContext';
import AuthStackNavigator from './src/navigation/AuthStack';
import AppStackNavigator from './src/navigation/AppStack';
import { getColors } from './src/styles/theme';

const AppContent = () => {
  const { isLoggedIn } = useAuth();
  const scheme = useColorScheme();
  const colors = getColors(scheme);

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: colors.primary,
      background: colors.background,
      card: colors.card,
      text: colors.text,
      border: colors.border,
      notification: colors.notification,
    },
  };

  const MyDarkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      primary: colors.primary,
      background: colors.background,
      card: colors.card,
      text: colors.text,
      border: colors.border,
      notification: colors.notification,
    },
  };

  return (
    <NavigationContainer theme={scheme === 'dark' ? MyDarkTheme : MyTheme}>
      {isLoggedIn ? <AppStackNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <UsersProvider>
        <AppContent />
      </UsersProvider>
    </AuthProvider>
  );
};

export default App;
