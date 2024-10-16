import { lazy, type FC } from 'react';
import type { RouteObject } from 'react-router';

import { historyNavigation } from '@/utils/common';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useRoutes } from 'react-router-dom';
import WrapperRouteComponent from './config';
import { PATHS } from '@/utils/paths';
import SignInPage from '@/pages/signin';
import SignUpPage from '@/pages/signup';
import MainLayout from '@/layout/main-layout';

const HomePage = lazy(() => import('@/pages/home'));
const PostPage = lazy(() => import('@/pages/post'));

const routes: RouteObject[] = [
    {
        path: PATHS.HOME,
        element: <WrapperRouteComponent element={<MainLayout />} title="" />,
        children: [
            {
                path: PATHS.HOME,
                element: <WrapperRouteComponent element={<HomePage />} title="Homepage" />,
            },
            {
                path: PATHS.POSTS,
                element: <WrapperRouteComponent element={<PostPage />} title="Posts Page" />,
            },
        ],
    },

    {
        path: PATHS.SIGNIN,
        element: <WrapperRouteComponent element={<SignInPage />} title="Signin Page" />,
    },
    {
        path: PATHS.SIGNUP,
        element: <WrapperRouteComponent element={<SignUpPage />} title="Signup Page" />,
    },
];

const RenderRouter: FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { logged } = useSelector(state => state.user);

    historyNavigation.navigate = useNavigate();
    historyNavigation.location = useLocation();

    const element = useRoutes(routes);
    return element;
};

export default RenderRouter;
