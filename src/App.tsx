import 'dayjs/locale/zh-cn';

import { Flex, Spin } from 'antd';
import { Suspense } from 'react';

import { history, HistoryRouter } from '@/routes/history';

import QueryProvider from './components/provider/query-provider';
import MainLayout from './layout/main-layout';
import RenderRouter from './routes';
import { useSelector } from 'react-redux';

const App: React.FC = () => {
    const { loading } = useSelector(state => state.global);

    return (
        <QueryProvider>
            <HistoryRouter history={history}>
                <Suspense
                    fallback={
                        <MainLayout>
                            <Flex justify="center">
                                <Spin size="large" />
                            </Flex>
                        </MainLayout>
                    }
                >
                    <RenderRouter />
                </Suspense>
            </HistoryRouter>
        </QueryProvider>
    );
};

export default App;
