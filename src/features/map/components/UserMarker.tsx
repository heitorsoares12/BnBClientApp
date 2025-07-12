import React from 'react';
import { Image, View, StyleSheet } from 'react-native';
import { Marker } from 'react-native-maps';
import { User } from '../../../types/user';

interface Props {
  user: User;
  onPress: () => void;
}

export default function UserMarker({ user, onPress }: Props) {
  const coordinate = {
    latitude: Number(user.location.coordinates.latitude),
    longitude: Number(user.location.coordinates.longitude),
  };

  return (
    <Marker coordinate={coordinate} onPress={onPress} tracksViewChanges={false}>
      <View style={styles.avatarContainer}>
        <Image source={{ uri: user.picture.thumbnail }} style={styles.avatar} />
      </View>
    </Marker>
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
