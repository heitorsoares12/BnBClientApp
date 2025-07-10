import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {User} from '../types/user';
import {SPACING} from '../styles/theme';

interface Props {
  user: User;
}

const UserListItem = ({user}: Props) => (
  <View style={styles.container}>
    <Image source={{uri: user.picture.thumbnail}} style={styles.avatar} />
    <View style={styles.info}>
      <Text>{`${user.name.first} ${user.name.last}`}</Text>
      <Text>{user.phone}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#ccc',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: SPACING,
  },
  info: {
    flex: 1,
  },
});

export default UserListItem;
