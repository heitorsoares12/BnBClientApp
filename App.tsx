import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { AuthProvider } from './src/contexts/AuthContext';
import { UsersProvider } from './src/contexts/UsersContext';
import RootNavigation from './src/navigation';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <AuthProvider>
      <UsersProvider>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <RootNavigation />
      </UsersProvider>
    </AuthProvider>
  );
}

export default App;
