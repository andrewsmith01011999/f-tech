import { useRedeemDocuments } from '@/hooks/query/redeem/useRedeemDocuments';
import { Empty, Flex } from 'antd';
import RewardItem from '../components/reward-item';

const RewardList = () => {
    const { data } = useRedeemDocuments();

    if (!data || !data.length) {
        return <Empty />;
    }

    return (
        <Flex align="center" justify="space-between" wrap gap={10}>
            {data.map(reward => (
                <RewardItem reward={reward} key={reward.documentId} />
            ))}
        </Flex>
    );
};

export default RewardList;
