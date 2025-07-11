import React, {useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, RefreshControl, StyleSheet, TouchableOpacity, View} from 'react-native';
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

const UserScreen = () => {
  const {users, setUsers} = useUsers();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [query, setQuery] = useState('');
  const debounced = useDebounce(query, 300);
  const navigation = useNavigation<StackNavigationProp<HomeStackParamList>>();

  

  const load = useCallback(async () => {
    try {
      const data = await fetchUsers();
      setUsers(data);
    } finally {
      setLoading(false);
    }
  }, [setUsers]);


  useEffect(() => {
    load();
  }, [load]);

  const onRefresh = async () => {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  };

  const filtered = filterUsers(users, debounced);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={COLORS.PRIMARY} />
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
        keyExtractor={(_, i) => String(i)}
        renderItem={({ item }) => (
          <UserListItem 
            user={item} 
            onPress={() => handleUserPress()} 
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.listContainer}
      />

      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('NewUser')}>
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
      color: '#999'
  }
});

export default UserScreen;
