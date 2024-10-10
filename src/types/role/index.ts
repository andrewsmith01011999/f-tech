export interface Role {
  id: string;
  name: string;
  code: string;
}

export type RoleStatus = 'enabled' | 'disabled';

export type RoleCode = "ROLE_ADMIN" | "ROLE_LEADER" | "ROLE_SELLER" | "ROLE_CS";

export type GetRoleResult = Role[];
