import type { Role } from '../role';

export type Locale = 'zh_CN' | 'en_US';


export interface Account {
  id: number;
  username: string;
  phoneNumber?: string;
  email?: string;
  fullName: string;
  staffId?: string;
  address?: string;
  description?: string;
  roles: Role[];
  createdAt?: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
}

export interface Permission {
  isAdmin?: boolean;
  isLeader?: boolean;
  isCS?: boolean;
  isSeller?: boolean;
}
