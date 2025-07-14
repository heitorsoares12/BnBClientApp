import React from 'react';
import { View, Text, StyleSheet, Image, useColorScheme } from 'react-native';
import { User } from '../types/user';
import { getColors } from '../styles/theme';

interface UserListItemProps {
  user: User;
}

const UserListItem = ({ user }: UserListItemProps) => {
  const scheme = useColorScheme();
  const colors = getColors(scheme);

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      backgroundColor: colors.card,
    },
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 15,
    },
    infoContainer: {
      flex: 1,
    },
    name: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text,
    },
    phone: {
      fontSize: 14,
      color: colors.secondary,
      marginTop: 5,
    },
  });

  return (
    <View style={styles.container}>
      <Image source={{ uri: user.picture.thumbnail }} style={styles.avatar} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{`${user.name.first} ${user.name.last}`}</Text>
        <Text style={styles.phone}>{user.phone}</Text>
      </View>
    </View>
  );
};

export default UserListItem;