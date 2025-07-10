import React, {createContext, ReactNode, useContext, useState} from 'react';
import {User} from '../types/user';

interface UsersContextValue {
  users: User[];
  setUsers: (users: User[]) => void;
  addUser: (user: User) => void;
}

const UsersContext = createContext<UsersContextValue>({
  users: [],
  setUsers: () => {},
  addUser: () => {},
});

export const UsersProvider = ({children}: {children: ReactNode}) => {
  const [users, setUsersState] = useState<User[]>([]);

  const setUsers = (newUsers: User[]) => setUsersState(newUsers);
  const addUser = (user: User) => setUsersState(prev => [user, ...prev]);

  return (
    <UsersContext.Provider value={{users, setUsers, addUser}}>
      {children}
    </UsersContext.Provider>
  );
};

export const useUsers = () => useContext(UsersContext);
