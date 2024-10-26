import { Flex } from 'antd';
import RewardItem from '../components/reward-item';

const RewardList = () => {
    return (
        <Flex align="center" justify="space-between" wrap gap={10}>
            <RewardItem />
            <RewardItem />
            <RewardItem />
            <RewardItem />
        </Flex>
    );
};

export default RewardList;
