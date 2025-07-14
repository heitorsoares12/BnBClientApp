import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { useUsers } from '../../contexts/UsersContext';
import UserListItem from '../../components/UserListItem';
import SearchBar from '../../components/SearchBar';
import useDebounce from '../../hooks/useDebounce';
import { filterUsers } from '../../utils/filterUsers';
import { useColorScheme } from 'react-native';
import { SPACING, getColors } from '../../styles/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { HomeStackParamList } from '../../navigation/AppStack';
import { StackNavigationProp } from '@react-navigation/stack';

const UserScreen = () => {
  const { users, fetchUsers, loading } = useUsers();
  const [refreshing, setRefreshing] = useState(false);
  const [query, setQuery] = useState('');
  const debounced = useDebounce(query, 300);
  const navigation = useNavigation<StackNavigationProp<HomeStackParamList>>();
  const scheme = useColorScheme();
  const colors = getColors(scheme);

  useEffect(() => {
    if (users.length === 0) {
      fetchUsers();
    }
  }, [fetchUsers, users.length]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchUsers();
    setRefreshing(false);
  }, [fetchUsers]);

  const filtered = filterUsers(users, debounced);

  if (loading && !refreshing) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  const handleUserPress = () => {
    console.log('Usuário selecionado:');
  };

  return (
    <View style={styles.container}>
      <SearchBar value={query} onChangeText={setQuery} />

      <FlatList
        data={filtered}
        keyExtractor={item => item.login.uuid}
        renderItem={({ item }) => (
          <UserListItem user={item} onPress={() => handleUserPress()} />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.listContainer}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('NewUserScreen')}>
        <Icon name="add" size={30} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    paddingHorizontal: SPACING || 20,
  },
  fab: {
    position: 'absolute',
    right: 30,
    bottom: 30,
    width: 60,
    height: 60,
    backgroundColor: '#F7941D',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  bottomNav: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 10,
    marginTop: 4,
    color: '#999',
  },
});

export default UserScreen;
