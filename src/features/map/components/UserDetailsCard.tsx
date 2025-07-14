import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { User } from '../../../types/user';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface UserDetailsCardProps {
  user: User;
  onClose: () => void;
}

const UserDetailsCard = ({ user, onClose }: UserDetailsCardProps) => {
  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Icon name="close" size={24} color="#333" />
      </TouchableOpacity>
      <Image source={{ uri: user.picture.large }} style={styles.avatar} />
      <Text style={styles.name}>{`${user.name.first} ${user.name.last}`}</Text>
      <Text style={styles.detail}>{user.email}</Text>
      <Text style={styles.detail}>{user.phone}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  detail: {
    fontSize: 16,
    color: '#555',
    marginBottom: 3,
  },
});

export default UserDetailsCard;