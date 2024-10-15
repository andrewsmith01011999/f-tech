import { themeConfig } from '@/consts/token';
import { ConfigProvider, Layout } from 'antd';
import { FC } from 'react';
import HeaderComponent from '../layout/header/header';
import { CardMenu } from './components/card-menu';
import { PageMenu } from './components/page-menu';
import { MenuWrapper } from './layout/menu-wrapper';
import { PageWrapper } from './layout/page-wrapper';
import { ResourceMenu } from './components/resource-menu';
import { PostSummary } from './components/post-summary';
import { PostWrapper } from './layout/post-wrapper';
import { EventList } from './components/events-list';
import { RecommendedCreatorList } from './components/recommended-creator-list';
import { EventsWrapper } from './layout/events-wrapper';

const HomePage: FC = props => {
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

                <PostWrapper>
                    {Array.from({ length: 10 }).map((_, index) => (
                        <PostSummary key={index} />
                    ))}
                </PostWrapper>

                <EventsWrapper>
                    <EventList />

                    <RecommendedCreatorList />
                </EventsWrapper>
            </PageWrapper>
        </Layout>
        </ConfigProvider>
    );
};

export default HomePage;
