import type { FC, ReactElement } from 'react';
import type { RouteProps } from 'react-router';


import { RoleCode } from '@/types/role';

export type WrapperRouteProps = RouteProps & {
  /** document title locale id */
  title: string;
  /** authorization */
  permittedRoles?: RoleCode[];
};

const WrapperRouteComponent: FC<WrapperRouteProps> = ({ title, permittedRoles: allowRoles, ...props }) => {
  if (title) {
    document.title = title;
  }
  
  return (props.element as ReactElement);
};

export default WrapperRouteComponent;
