import React from 'react';
import {Modal, View, Text, StyleSheet, Image, TouchableOpacity, useColorScheme} from 'react-native';
import {User} from '../../../types/user';

interface Props {
  user: User | null;
  onClose: () => void;
}

export default function ClientModal({user, onClose}: Props) {
  const scheme = useColorScheme();
  if (!user) return null;
  return (
    <Modal visible={!!user} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={[styles.container, scheme === 'dark' && styles.containerDark]}>
          <Image source={{uri: user.picture.thumbnail}} style={styles.avatar} />
          <Text style={[styles.name, scheme === 'dark' && styles.textDark]}>{user.name.first} {user.name.last}</Text>
          <Text style={[styles.phone, scheme === 'dark' && styles.textDark]}>{user.phone}</Text>
          {user.location.city && (
            <Text style={[styles.phone, scheme === 'dark' && styles.textDark]}>{user.location.city}</Text>
          )}
          <TouchableOpacity onPress={onClose} style={styles.closeButton} accessibilityLabel="Fechar">
            <Text style={styles.closeText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)'},
  container: {backgroundColor: '#fff', padding: 20, borderRadius: 12, width: '80%', alignItems: 'center'},
  containerDark: {backgroundColor: '#333'},
  avatar: {width: 80, height: 80, borderRadius: 40, marginBottom: 10},
  name: {fontSize: 18, fontWeight: 'bold', color: '#000'},
  phone: {fontSize: 16, color: '#555', marginTop: 4},
  textDark: {color: '#fff'},
  closeButton: {marginTop: 20, backgroundColor: '#F79D41', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 8},
  closeText: {color: '#fff', fontWeight: 'bold'},
});
