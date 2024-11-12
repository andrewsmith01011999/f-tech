import { useRedeemDocuments } from '@/hooks/query/redeem/use-redeem-documents';
import { Empty, Flex } from 'antd';
import RewardItem from '../components/reward-item';
import { useMyReward } from '@/hooks/query/redeem/use-my-reward';

const RewardList = () => {
    const { data } = useRedeemDocuments();
    const {data: myRewards} = useMyReward();

    if (!data || !data.length) {
        return <Empty />;
    }

    return (
        <Flex align="center" justify="space-between" wrap gap={10}>
            {data.map(reward => (
                myRewards?.reward?.find(myReward => myReward?.rewardId === reward?.rewardId) ? null : <RewardItem reward={reward} key={reward.rewardId} />
            ))}
        </Flex>
    );
};

export default RewardList;
