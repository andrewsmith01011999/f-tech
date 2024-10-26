import RewardCard from '@/components/core/reward-card';
import { SecondaryButton } from '@/components/core/secondary-button';
import { Flex, Space, Typography } from 'antd';
import PlaceholderSvg from '/public/placeholder.svg';

const RewardItem = () => {
    return (
        <RewardCard hoverable style={{ width: 348 }} cover={<img alt="example" src={PlaceholderSvg} />}>
            <Space direction="vertical" size={10}>
                <Typography.Title level={4}>Single learning program</Typography.Title>
                <Typography.Text style={{ color: '#FF6934' }}>100000MC</Typography.Text>
            </Space>

            <Flex justify="flex-end">
                <SecondaryButton>Redeem</SecondaryButton>
            </Flex>
        </RewardCard>
    );
};

export default RewardItem;
