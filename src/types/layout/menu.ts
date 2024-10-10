import { RoleCode } from "../role";

interface MenuItem {
  id: string;

  label: string

  icon?: string;

  path: string;

  children?: MenuItem[];

  permittedRoles?: RoleCode[];
}

export type MenuChild = Omit<MenuItem, 'children'>;

export type MenuList = MenuItem[];
