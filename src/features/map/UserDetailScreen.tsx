import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { MapStackParamList } from '../../navigation/AppStack';

export type UserDetailProps = StackScreenProps<MapStackParamList, 'UserDetail'>;

export default function UserDetailScreen({ route }: UserDetailProps) {
  const { user } = route.params;
  return (
    <View style={styles.container}>
      <Image source={{ uri: user.picture.thumbnail }} style={styles.avatar} />
      <Text style={styles.name}>{`${user.name.first} ${user.name.last}`}</Text>
      <Text style={styles.phone}>{user.phone}</Text>
      {user.location.city && <Text style={styles.city}>{user.location.city}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  phone: {
    fontSize: 16,
    marginBottom: 4,
  },
  city: {
    fontSize: 16,
  },
});
