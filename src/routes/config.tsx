import type { FC, ReactElement } from 'react';
import type { RouteProps } from 'react-router';

import { useIntl } from 'react-intl';

import PrivateRoute from './private-route';
import { useSelector } from 'react-redux';
import { RoleCode } from '@/types/role';

export type WrapperRouteProps = RouteProps & {
  /** document title locale id */
  title: string;
  /** authorization */
  permittedRoles?: RoleCode[];
};

const WrapperRouteComponent: FC<WrapperRouteProps> = ({ title, permittedRoles: allowRoles, ...props }) => {
  const { formatMessage } = useIntl();

  const { roles } = useSelector(state => state.user);

  if (title) {
    document.title = title
  }

  let isAuthorized = !allowRoles || allowRoles.some(role => roles.includes(role));

  // return !isAuthorized ? <PrivateRoute {...props} /> : (props.element as ReactElement);
  return !isAuthorized ? <></> : (props.element as ReactElement);
};

export default WrapperRouteComponent;
