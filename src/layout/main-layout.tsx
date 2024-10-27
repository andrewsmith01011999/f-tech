import { themeConfig } from '@/consts/token';
import { useProfile } from '@/hooks/query/auth/use-profile';
import { useWallet } from '@/hooks/query/auth/use-wallet';
import { CardMenu } from '@/pages/home/components/card-menu';
import { EventList } from '@/pages/home/components/events-list';
import { PageMenu } from '@/pages/home/components/page-menu';
import { PopularMenu } from '@/pages/home/components/popular-menu';
import { RecommendedCreatorList } from '@/pages/home/components/recommended-creator-list';
import { ResourceMenu } from '@/pages/home/components/resource-menu';
import { EventsWrapper } from '@/pages/home/layout/events-wrapper';
import { MenuWrapper } from '@/pages/home/layout/menu-wrapper';
import { PageWrapper } from '@/pages/home/layout/page-wrapper';
import HeaderComponent from '@/pages/layout/header/header';
import { RightOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, ConfigProvider, Layout } from 'antd';
import React, { FC, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import TagXSvg from '/public/tag-x.svg';

interface MainLayoutProps {
    children?: React.ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children = <Outlet /> }) => {
    const navigate = useNavigate();

    // load profile
    const { data: profileData, isLoading: isProfileLoading } = useProfile();
    const { data: walletData, isLoading: isWalletLoading } = useWallet();

    const [history, setHistory] = useState<string>('');

    const pathSnippets = location.pathname.split('/').filter(i => i);
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;

        return {
            path: url,
            breadcrumbName: (
                <Link to={url} onClick={() => setHistory(location.pathname)}>
                    {url.split('/').splice(-1)?.[0]}
                </Link>
            ),
        };
    });

    const breadcrumbItems = [
        {
            ...(location.pathname.split('/').length > 1 && {
                path: '-1',
                breadcrumbName: (
                    <Button
                        size="small"
                        type="text"
                        icon={<img src={TagXSvg} alt="tag-x" />}
                        onClick={() => {
                            setHistory(location.pathname);
                            navigate(-1);
                        }}
                    />
                ),
            }),
        },
        ...extraBreadcrumbItems,
        {
            ...(location.pathname.length < history.length &&
                history.includes(location.pathname) && {
                    path: '1',
                    breadcrumbName: <RightOutlined onClick={() => navigate(history)} />,
                }),
        },
    ];

    return (
        <ConfigProvider theme={themeConfig}>
            <Layout>
                <HeaderComponent
                    collapsed={false}
                    toggle={function (): void {
                        throw new Error('Function not implemented.');
                    }}
                />

                <PageWrapper>
                    <MenuWrapper>
                        <CardMenu>
                            <PageMenu />
                        </CardMenu>

                        <CardMenu title="Popular Topic">
                            <PopularMenu />
                        </CardMenu>

                        <CardMenu title="Resource">
                            <ResourceMenu />
                        </CardMenu>
                    </MenuWrapper>

                    <div style={{ minWidth: 760 }}>
                        <Breadcrumb>
                            {breadcrumbItems.map(item => (
                                <React.Fragment key={item.path}>
                                    <Breadcrumb.Item>{item.breadcrumbName}</Breadcrumb.Item>
                                </React.Fragment>
                            ))}
                        </Breadcrumb>

                        {children}
                    </div>

                    <EventsWrapper>
                        <EventList />

                        <RecommendedCreatorList />
                    </EventsWrapper>
                </PageWrapper>
            </Layout>
        </ConfigProvider>
    );
};

export default MainLayout;
