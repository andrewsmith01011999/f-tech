import 'dayjs/locale/zh-cn';

import { ConfigProvider, Spin } from 'antd';
import { Suspense } from 'react';
import { useSelector } from 'react-redux';

import { history, HistoryRouter } from '@/routes/history';

import RenderRouter from './routes';
import { themeConfig } from './consts/token';

const App: React.FC = () => {
    const {loading } = useSelector(state => state.global);


    return (
        <ConfigProvider theme={themeConfig}>
            <HistoryRouter history={history}>
                <Suspense
                    fallback={
                        <Spin spinning={loading} className="app-loading-wrapper" tip={<div>Loading</div>}>
                            Loading
                        </Spin>
                    }
                >
                    <RenderRouter />
                </Suspense>
            </HistoryRouter>
        </ConfigProvider>
    );
};

export default App;
