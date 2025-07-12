import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView from 'react-native-map-clustering';
import { UrlTile } from 'react-native-maps';
import { useUsers } from '../../contexts/UsersContext';
import { User } from '../../types/user';
import UserMarker from './components/UserMarker';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MapStackParamList } from '../../navigation/AppStack';

const INITIAL_REGION = {
  latitude: -14.2,
  longitude: -51.9,
  latitudeDelta: 30,
  longitudeDelta: 30,
};

const MapScreen = () => {
  const { users } = useUsers();
  const navigation = useNavigation<StackNavigationProp<MapStackParamList>>();

  const handleMarkerPress = (user: User) => {
    navigation.navigate('UserDetail', { user });
  };

  return (
    <View style={styles.page}>
      <MapView style={styles.map} initialRegion={INITIAL_REGION} animationEnabled={false}>
        <UrlTile urlTemplate="https://tile.openstreetmap.org/{z}/{x}/{y}.png" maximumZ={19} />
        {users.map(u => (
          <UserMarker key={u.login.uuid} user={u} onPress={() => handleMarkerPress(u)} />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  page: { flex: 1 },
  map: { flex: 1 },
});

export default MapScreen;
