import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, useColorScheme, Alert } from 'react-native';
import { Marker, Region } from 'react-native-maps';
import Clustering from 'react-native-map-clustering';
import UserDetailsCard from './components/UserDetailsCard';
import { useUsers } from '../../contexts/UsersContext';
import { User } from '../../types/user';
import { getColors } from '../../styles/theme';
import UserMarker from './components/UserMarker';
import Geolocation from '@react-native-community/geolocation';

const MapScreen = () => {
  const { users, loading, error, fetchUsers } = useUsers();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [region, setRegion] = useState<Region | null>(null);
  const scheme = useColorScheme();
  const colors = getColors(scheme);

  useEffect(() => {
    if (users.length > 0 && !region) {
      const firstUser = users[0];
      setRegion({
        latitude: parseFloat(firstUser.location.coordinates.latitude),
        longitude: parseFloat(firstUser.location.coordinates.longitude),
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  }, [users, region]);

  useEffect(() => {
    if (users.length === 0 && !loading && !error) {
      fetchUsers();
    }
  }, [users, loading, error, fetchUsers]);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setRegion({
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      },
      err => {
        console.log('Error getting location:', err);
        Alert.alert('Erro de Localização', 'Não foi possível obter sua localização atual.');
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
    centered: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background,
    },
    errorText: {
      color: colors.notification,
      fontSize: 16,
      marginBottom: 10,
    },
    clusterContainer: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: '#F7941D',
      justifyContent: 'center',
      alignItems: 'center',
    },
    clusterText: {
      color: 'white',
      fontWeight: 'bold',
    },
  });

  if (loading || !region) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={{ color: colors.text }}>Carregando mapa e usuários...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Clustering
        renderCluster={({ count, coordinate, onPress }) => (
          <Marker coordinate={coordinate} onPress={onPress}>
            <View style={styles.clusterContainer}>
              <Text style={styles.clusterText}>{count}</Text>
            </View>
          </Marker>
        )}
        region={region}
        onRegionChangeComplete={setRegion}
        style={styles.map}
        showsUserLocation={true}
        followsUserLocation={true}
      >
        {users.map((user: User) => {
          const latitude = parseFloat(user.location.coordinates.latitude);
          const longitude = parseFloat(user.location.coordinates.longitude);

          if (isNaN(latitude) || isNaN(longitude)) {
            console.warn(`Usuário ${user.login.uuid} possui coordenadas inválidas:`, user.location.coordinates);
            return null;
          }

          return (
            <Marker
              key={user.login.uuid}
              coordinate={{ latitude, longitude }}
              onPress={() => setSelectedUser(user)}
            >
              <UserMarker user={user} selected={selectedUser?.login.uuid === user.login.uuid} />
            </Marker>
          );
        })}
      </Clustering>
      {users.length === 0 && !loading && region && (
        <View style={styles.centered}>
          <Text style={{ color: colors.text }}>Nenhum usuário disponível para exibir no mapa.</Text>
        </View>
      )}
      {selectedUser && (
        <UserDetailsCard user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}
    </View>
  );
};

export default MapScreen;
