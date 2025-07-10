import React, { createContext, ReactNode, useState } from 'react';
import { User } from '../types/user';

interface UsersContextValue {
  users: User[];
  setUsers(users: User[]): void;
  addUser(user: User): void;
}

export const UsersContext = createContext<UsersContextValue>({
  users: [],
  setUsers: () => {},
  addUser: () => {},
});

export function UsersProvider({ children }: { children: ReactNode }) {
  const [users, setUsersState] = useState<User[]>([]);

  function setUsers(list: User[]) {
    setUsersState(list);
  }

  function addUser(user: User) {
    setUsersState(prev => [user, ...prev]);
  }

  return (
    <UsersContext.Provider value={{ users, setUsers, addUser }}>
      {children}
    </UsersContext.Provider>
  );
}
