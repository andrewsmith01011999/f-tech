import { BaseTab } from '@/components/core/tab';
import { TabsProps } from 'antd';
import RewardList from './layout/reward-list';
import RewardWrapper from './layout/reward-wrapper';

const RewardPage = () => {
    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'SOURCE & COURSES',
            children: <RewardList />,
        },
        {
            key: '2',
            label: 'SOURCE & CODE',
            children: <RewardList />,
        },
    ];

    return (
        <RewardWrapper>
            <BaseTab items={items} defaultActiveKey="1" />
        </RewardWrapper>
    );
};

export default RewardPage;
