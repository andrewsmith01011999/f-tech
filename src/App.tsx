import 'dayjs/locale/zh-cn';

import { Spin } from 'antd';
import { Suspense } from 'react';
import { useSelector } from 'react-redux';

import { history, HistoryRouter } from '@/routes/history';

import RenderRouter from './routes';

const App: React.FC = () => {
    const {loading } = useSelector(state => state.global);

    return (
        <HistoryRouter history={history}>
            <Suspense fallback={null}>
                <Spin
                    spinning={loading}
                    className="app-loading-wrapper"
                    tip={"Loading"}
                ></Spin>
                <RenderRouter />
            </Suspense>
        </HistoryRouter>
    );
};

export default App;
