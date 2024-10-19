import type { FC, ReactElement } from 'react';
import type { RouteProps } from 'react-router';


import { RoleName } from '@/types/role';
import { useSelector } from 'react-redux';
import { RootState } from '@/stores';

export type WrapperRouteProps = RouteProps & {
  /** document title locale id */
  title: string;
  /** authorization */
  permittedRoles?: RoleName[];

};

const WrapperRouteComponent: FC<WrapperRouteProps> = ({ title, permittedRoles: allowRoles, ...props }) => {
  const {logged} = useSelector((state: RootState) => state.account);

  if (title) {
    document.title = title;
  }

  return (props.element as ReactElement);
};

export default WrapperRouteComponent;
