import { themeConfig } from '@/consts/token';
import { ConfigProvider, Layout } from 'antd';
import { FC } from 'react';
import HeaderComponent from '../layout/header/header';
import { CardMenu } from './components/card-menu';
import { PageMenu } from './components/page-menu';
import { PopularMenu } from './components/popular-menu';
import { ResourceMenu } from './components/resource-menu';
import { MenuWrapper } from './layout/menu-wrapper';
import { PageWrapper } from './layout/page-wrapper';

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

                        <CardMenu title="Popular Topic">
                            <PopularMenu />
                        </CardMenu>

                        <CardMenu title="Resource">
                            <ResourceMenu />
                        </CardMenu>
                    </MenuWrapper>
                </PageWrapper>
            </Layout>
        </ConfigProvider>
    );
};

export default HomePage;
