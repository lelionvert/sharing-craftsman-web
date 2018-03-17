import { Role } from './role.model';

export interface Group {
  name: string;
  roles: Role[];
}