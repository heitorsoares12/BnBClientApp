import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapboxGL from '@rnmapbox/maps';
import Geolocation from 'react-native-geolocation-service';
import { useUsers } from '../../contexts/UsersContext';
import { User } from '../../types/user';
import UserMarker from './components/UserMarker';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MapStackParamList } from '../../navigation/AppStack';

// Substitua pela sua chave de acesso do Mapbox
MapboxGL.setAccessToken('YOUR_MAPBOX_TOKEN');

const INITIAL_COORDINATE: [number, number] = [-51.9, -14.2];

const MapScreen = () => {
  const { users } = useUsers();
  const navigation = useNavigation<StackNavigationProp<MapStackParamList>>();
  const [center, setCenter] = useState<[number, number]>(INITIAL_COORDINATE);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        setCenter([position.coords.longitude, position.coords.latitude]);
      },
      error => {
        console.warn(error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }, []);

  const handleMarkerPress = (user: User) => {
    navigation.navigate('UserDetail', { user });
  };

  return (
    <View style={styles.page}>
      <MapboxGL.MapView style={styles.map}>
        <MapboxGL.Camera zoomLevel={5} centerCoordinate={center} />
        <MapboxGL.UserLocation visible />
        {users.map(u => (
          <UserMarker key={u.login.uuid} user={u} onPress={() => handleMarkerPress(u)} />
        ))}
      </MapboxGL.MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  page: { flex: 1 },
  map: { flex: 1 },
});

export default MapScreen;
