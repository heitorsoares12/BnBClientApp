import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { User } from '../types/user';
import { fetchUsers as UserServiceFetchUsers } from '../services/UserService';

interface UsersContextType {
  users: User[];
  loading: boolean;
  error: string | null;
  fetchUsers: () => Promise<void>;
  addUser: (newUser: User) => void;
  setUsers: (users: User[]) => void;
}

const UsersContext = createContext<UsersContextType | undefined>(undefined);

interface UsersProviderProps {
  children: ReactNode;
}

export const UsersProvider = ({ children }: UsersProviderProps) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedUsers = await UserServiceFetchUsers(10);
      setUsers(fetchedUsers);
    } catch (err) {
      setError('Erro ao carregar usuários.');
      console.error('Error fetching users in context:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const addUser = (newUser: User) => {
    setUsers((prevUsers) => [newUser, ...prevUsers]);
  };

  return (
    <UsersContext.Provider value={{ users, loading, error, fetchUsers, addUser, setUsers }}>
      {children}
    </UsersContext.Provider>
  );
};

export const useUsers = () => {
  const context = useContext(UsersContext);
  if (context === undefined) {
    throw new Error('useUsers must be used within a UsersProvider');
  }
  return context;
};