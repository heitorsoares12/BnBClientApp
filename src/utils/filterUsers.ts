import { User } from '../types/user';

export const filterUsers = (users: User[], searchTerm: string): User[] => {
  if (!searchTerm) {
    return users;
  }

  const lowerCaseSearchTerm = searchTerm.toLowerCase();

  return users.filter(user => {
    const fullName = `${user.name.first} ${user.name.last}`.toLowerCase();
    const phoneNumber = user.phone.toLowerCase();

    return fullName.includes(lowerCaseSearchTerm) || phoneNumber.includes(lowerCaseSearchTerm);
  });
};