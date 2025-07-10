import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { UsersContext } from '../../contexts/UsersContext';

export default function MapScreen() {
  const { users } = useContext(UsersContext);

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: -14.2,
        longitude: -51.9,
        latitudeDelta: 30,
        longitudeDelta: 30,
      }}
    >
      {users.map((u, idx) => (
        <Marker
          key={idx}
          coordinate={{
            latitude: Number(u.location.coordinates.latitude),
            longitude: Number(u.location.coordinates.longitude),
          }}
          title={`${u.name.first} ${u.name.last}`}
          description={u.phone}
        />
      ))}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: { flex: 1 },
});
