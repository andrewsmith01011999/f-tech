import { lazy, type FC } from 'react';
import type { RouteObject } from 'react-router';

import { historyNavigation } from '@/utils/common';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useRoutes } from 'react-router-dom';
import WrapperRouteComponent from './config';
import { PATHS } from '@/utils/paths';

const HomePage = lazy(() => import('@/pages/home'));

const routes: RouteObject[] = [
  {
    path: PATHS.HOME,
    element: <WrapperRouteComponent element={<HomePage />} title="Homage" />,
  },
];

const RenderRouter: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { logged } = useSelector(state => state.user);

  historyNavigation.navigate = useNavigate();
  historyNavigation.location = useLocation();

  // useEffect(() => {
  //   if (location.pathname === PATHS.LOGIN) {
  //     return;
  //   }

  //   const token = localStorage.getItem(LocalStorageKeys.ACCESS_TOKEN_KEY);

  //   if (!token) {
  //     navigate(PATHS.LOGIN);
  //     return;
  //   }

  // }, [logged]);

  const element = useRoutes(routes);
  return element;
};

export default RenderRouter;
