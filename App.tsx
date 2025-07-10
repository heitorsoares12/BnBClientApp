import React from 'react';
import {StatusBar} from 'react-native';
import {AuthProvider} from './src/contexts/AuthContext';
import {UsersProvider} from './src/contexts/UsersContext';
import Navigation from './src/navigation';

const App = () => (
  <AuthProvider>
    <UsersProvider>
      <StatusBar barStyle="dark-content" />
      <Navigation />
    </UsersProvider>
  </AuthProvider>
);

export default App;
