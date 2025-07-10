import {User} from '../types/user';

export default function filterUsers(users: User[], query: string): User[] {
  if (!query) return users;
  const lower = query.toLowerCase();
  return users.filter(user => {
    const name = `${user.name.first} ${user.name.last}`.toLowerCase();
    const phone = user.phone.toLowerCase();
    return name.includes(lower) || phone.includes(lower);
  });
}
