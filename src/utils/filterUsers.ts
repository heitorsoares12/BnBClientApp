import { User } from '../types/user';

export function filterUsers(users: User[], query: string): User[] {
  const q = query.toLowerCase();
  return users.filter(u => {
    const name = `${u.name.first} ${u.name.last}`.toLowerCase();
    const phone = u.phone.toLowerCase();
    return name.includes(q) || phone.includes(q);
  });
}
