import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { fetchUsers } from '../../services/UserService';
import { UsersContext } from '../../contexts/UsersContext';
import UserListItem from '../../components/UserListItem';
import SearchBar from '../../components/SearchBar';
import { COLORS, SPACING } from '../../styles/theme';
import { filterUsers } from '../../utils/filterUsers';
import { useDebounce } from '../../hooks/useDebounce';
import { HomeStackParamList } from '../../navigation/HomeStack';
import { StackScreenProps } from '@react-navigation/stack';

type Props = StackScreenProps<HomeStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const { users, setUsers } = useContext(UsersContext);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);
  const [filtered, setFiltered] = useState(users);

  async function load() {
    setLoading(true);
    try {
      const data = await fetchUsers();
      setUsers(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    setFiltered(filterUsers(users, debouncedQuery));
  }, [users, debouncedQuery]);

  async function onRefresh() {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  }

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
      <FlatList
        data={filtered}
        keyExtractor={(_, i) => i.toString()}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        renderItem={({ item }) => <UserListItem user={item} />}
        ListEmptyComponent={<Text style={styles.center}>Nenhum usuário encontrado</Text>}
      />
      <Text style={styles.add} onPress={() => navigation.navigate('NewUser')} accessibilityRole="button">+</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  add: {
    position: 'absolute',
    right: SPACING,
    bottom: SPACING,
    fontSize: 30,
  },
});
