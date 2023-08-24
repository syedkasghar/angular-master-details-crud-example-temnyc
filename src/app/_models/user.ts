import { Role } from './role';

export class User {
  id: string;
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  role: Role;
  authdata?: string;
}
