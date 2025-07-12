import React from 'react';
import { Image, View, StyleSheet } from 'react-native';
import MapboxGL from '@rnmapbox/maps';
import { User } from '../../../types/user';

interface Props {
  user: User;
  onPress: () => void;
}

export default function UserMarker({ user, onPress }: Props) {
  const coordinate: [number, number] = [
    Number(user.location.coordinates.longitude),
    Number(user.location.coordinates.latitude),
  ];

  return (
    <MapboxGL.PointAnnotation
      id={user.login.uuid}
      coordinate={coordinate}
      onSelected={onPress}
    >
      <View style={styles.avatarContainer}>
        <Image source={{ uri: user.picture.thumbnail }} style={styles.avatar} />
      </View>
    </MapboxGL.PointAnnotation>
  );
}

const styles = StyleSheet.create({
  avatarContainer: {
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 20,
    overflow: 'hidden',
  },
  avatar: {
    width: 40,
    height: 40,
  },
});
