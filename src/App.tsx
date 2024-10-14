import 'dayjs/locale/zh-cn';

import { Spin } from 'antd';
import { Suspense } from 'react';
import { useSelector } from 'react-redux';

import { history, HistoryRouter } from '@/routes/history';

import RenderRouter from './routes';
import { API_PATH } from './utils/env';

const App: React.FC = () => {
    const { loading } = useSelector(state => state.global);
    console.log(API_PATH)
    return (
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
    );
};

export default App;
