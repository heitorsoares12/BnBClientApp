import React from 'react';
import MapView, {Marker} from 'react-native-maps';
import {StyleSheet, View} from 'react-native';
import {useUsers} from '../../contexts/UsersContext';

const MapScreen = () => {
  const {users} = useUsers();

  return (
    <View style={styles.container}>
      <MapView
        style={StyleSheet.absoluteFill}
        initialRegion={{
          latitude: -14.2,
          longitude: -51.9,
          latitudeDelta: 30,
          longitudeDelta: 30,
        }}>
        {users.map((user, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: Number(user.location.coordinates.latitude),
              longitude: Number(user.location.coordinates.longitude),
            }}
            title={`${user.name.first} ${user.name.last}`}
            description={user.phone}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MapScreen;
