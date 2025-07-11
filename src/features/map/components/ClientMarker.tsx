import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {Marker, Callout} from 'react-native-maps';
import {User} from '../../../types/user';

interface Props {
  user: User;
  onPress: () => void;
}

export default function ClientMarker({user, onPress}: Props) {
  const {latitude, longitude} = user.location.coordinates;
  return (
    <Marker
      coordinate={{latitude: Number(latitude), longitude: Number(longitude)}}
    >
      <Image source={{uri: user.picture.thumbnail}} style={styles.avatar} />
      <Callout tooltip onPress={onPress}>
        <Image source={{uri: user.picture.thumbnail}} style={styles.calloutAvatar} />
      </Callout>
    </Marker>
  );
}

const styles = StyleSheet.create({
  avatar: {width: 40, height: 40, borderRadius: 20, borderWidth: 2, borderColor: '#fff'},
  calloutAvatar: {width: 60, height: 60, borderRadius: 30},
});
