import React, {useRef, useState} from 'react';
import {StyleSheet, View, TouchableOpacity, PermissionsAndroid, Platform} from 'react-native';
import MapView, {MapType} from 'react-native-maps';
import ClusteredMapView from 'react-native-map-clustering';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useUsers} from '../../contexts/UsersContext';
import ClientMarker from './components/ClientMarker';
import ClientModal from './components/ClientModal';
import {User} from '../../types/user';

const INITIAL_REGION = {
  latitude: -14.2,
  longitude: -51.9,
  latitudeDelta: 30,
  longitudeDelta: 30,
};

const MapScreen = () => {
  const {users} = useUsers();
  const mapRef = useRef<MapView>(null);
  const [mapType, setMapType] = useState<MapType>('standard');
  const [selected, setSelected] = useState<User | null>(null);

  const toggleMapType = () => {
    setMapType(prev => (prev === 'standard' ? 'hybrid' : 'standard'));
  };

  const centerOnUser = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        return;
      }
    }
    navigator.geolocation.getCurrentPosition(
      position => {
        mapRef.current?.animateToRegion(
          {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          },
          500,
        );
      },
      error => console.warn(error.message),
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  return (
    <View style={styles.container}>
      <ClusteredMapView
        ref={mapRef}
        style={StyleSheet.absoluteFill}
        initialRegion={INITIAL_REGION}
        mapType={mapType}
      >
        {users.map((user, i) => (
          <ClientMarker key={i} user={user} onPress={() => setSelected(user)} />
        ))}
      </ClusteredMapView>

      <View style={styles.controls} pointerEvents="box-none">
        <TouchableOpacity
          style={styles.fab}
          onPress={centerOnUser}
          accessibilityLabel="Mostrar minha localização">
          <Icon name="my-location" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.fab}
          onPress={toggleMapType}
          accessibilityLabel="Alternar tipo de mapa">
          <Icon name={mapType === 'standard' ? 'satellite' : 'map'} size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <ClientModal user={selected} onClose={() => setSelected(null)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  controls: {position: 'absolute', right: 16, bottom: 30},
  fab: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#0B4B3C',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    elevation: 5,
  },
});

export default MapScreen;
