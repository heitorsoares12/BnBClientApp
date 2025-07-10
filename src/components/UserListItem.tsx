import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { User } from '../types/user';
import { SPACING } from '../styles/theme';

export default function UserListItem({ user }: { user: User }) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: user.picture.thumbnail }} style={styles.avatar} />
      <View style={styles.info}>
        <Text>{`${user.name.first} ${user.name.last}`}</Text>
        <Text>{user.phone}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: SPACING,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: SPACING,
  },
  info: {
    justifyContent: 'center',
  },
});
