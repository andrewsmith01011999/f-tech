import { themeConfig } from '@/consts/token';
import { ConfigProvider, Layout } from 'antd';
import HeaderComponent from '@/pages/layout/header/header';
import { PageWrapper } from '@/pages/home/layout/page-wrapper';
import { MenuWrapper } from '@/pages/home/layout/menu-wrapper';
import { CardMenu } from '@/pages/home/components/card-menu';
import { PageMenu } from '@/pages/home/components/page-menu';
import { ResourceMenu } from '@/pages/home/components/resource-menu';
import { Outlet } from 'react-router-dom';
import { EventsWrapper } from '@/pages/home/layout/events-wrapper';
import { EventList } from '@/pages/home/components/events-list';
import { RecommendedCreatorList } from '@/pages/home/components/recommended-creator-list';
import { FC } from 'react';

interface MainLayoutProps {
    children?: React.ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children = <Outlet /> }) => {
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

                        <CardMenu title="Resource">
                            <ResourceMenu />
                        </CardMenu>
                    </MenuWrapper>

                    <div style={{ minWidth: 760 }}>{children}</div>

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
