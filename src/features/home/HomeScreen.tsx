import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useUsers} from '../../contexts/UsersContext';
import {fetchUsers} from '../../services/UserService';
import UserListItem from '../../components/UserListItem';
import SearchBar from '../../components/SearchBar';
import useDebounce from '../../hooks/useDebounce';
import filterUsers from '../../utils/filterUsers';
import {COLORS, SPACING} from '../../styles/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {HomeStackParamList} from '../../navigation/AppStack';
import {StackNavigationProp} from '@react-navigation/stack';

const HomeScreen = () => {
  const {users, setUsers} = useUsers();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [query, setQuery] = useState('');
  const debounced = useDebounce(query, 300);
  const navigation = useNavigation<StackNavigationProp<HomeStackParamList>>();

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const data = await fetchUsers();
      setUsers(data);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  };

  const filtered = filterUsers(users, debounced);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.PRIMARY} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SearchBar value={query} onChange={setQuery} />
      {filtered.length === 0 ? (
        <View style={styles.center}>
          <Text>Nenhum usuário encontrado</Text>
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(_, i) => String(i)}
          renderItem={({item}) => <UserListItem user={item} />}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('NewUser')}>
        <Icon name="add" color="#fff" size={24} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fab: {
    position: 'absolute',
    right: SPACING,
    bottom: SPACING,
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 24,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
