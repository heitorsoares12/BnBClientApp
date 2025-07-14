import React, { useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  StatusBar,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from '../../navigation/AppStack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = () => {
  const navigation = useNavigation<StackNavigationProp<HomeStackParamList>>();

  const handleCadastroPress = useCallback(() => {
    navigation.navigate('NewUserScreen');
  }, [navigation]);

  const handleCadastradosPress = useCallback(() => {
    navigation.navigate('UserScreen');
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0B4B3C" />

      <View style={styles.header}>
        <Text style={styles.greeting}>Olá, Alice</Text>
        <View style={styles.locationContainer}>
          <Icon name="location-on" size={18} color="#7a7a7a" />
          <Text style={styles.locationText}>A5874125</Text>
        </View>
      </View>

      <Image
        source={require('../../assets/building.png')}
        style={styles.mainImage}
        resizeMode="cover"
      />

      <TouchableOpacity style={styles.button} onPress={handleCadastroPress}>
        <Icon name="person-add" size={24} color="#F7941D" />
        <Text style={styles.buttonText}>Cadastro</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleCadastradosPress}>
        <Icon name="people-alt" size={24} color="#F7941D" />
        <Text style={styles.buttonText}>Consultar Organização</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  topBar: {
    height: 40,
    backgroundColor: '#0B4B3C',
    width: '100%',
  },
  header: {
    alignItems: 'flex-start',
    width: '100%',
    marginVertical: 16,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0B4B3C',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  locationText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#7a7a7a',
  },
  mainImage: {
    width: '100%',
    height: 140,
    borderRadius: 12,
    marginBottom: 20,
  },
  button: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 12,
    marginVertical: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
    borderBottomWidth: 4,
    borderBottomColor: '#F7941D',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 10,
  },
});

export default HomeScreen;