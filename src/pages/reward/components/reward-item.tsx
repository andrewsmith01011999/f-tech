import RewardCard from '@/components/core/reward-card';
import { SecondaryButton } from '@/components/core/secondary-button';
import { useCreateRedeem } from '@/hooks/mutate/redeem/use-create-redeem';
import { RootState } from '@/stores';
import { RedeemDocument } from '@/types/redeem/redeem';
import { Flex, Space, Typography } from 'antd';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import PlaceholderSvg from '/public/placeholder.svg';

interface RewardItemProps {
    reward: RedeemDocument;
}

const RewardItem: FC<RewardItemProps> = ({ reward }) => {
    const { name, type, image, price, status, sectionList, documentId } = reward;

    const { accountInfo } = useSelector((state: RootState) => state.account);

    const { mutate: createRedeem, isPending: isPendingCreateRedeem } = useCreateRedeem();

    const handleCreateRedeem = () => {
        createRedeem({ accountId: accountInfo?.accountId || '', documentId });
    };

    return (
        <RewardCard hoverable style={{ width: 348 }} cover={<img alt="example" src={image || PlaceholderSvg} />}>
            <Space direction="vertical" size={10}>
                <Typography.Title level={4}>{name}</Typography.Title>
                <Typography.Text style={{ color: '#FF6934' }}>{price} MC</Typography.Text>
            </Space>

            <Flex justify="flex-end">
                <SecondaryButton loading={isPendingCreateRedeem} onClick={handleCreateRedeem}>
                    Buy
                </SecondaryButton>
            </Flex>
        </RewardCard>
    );
};

export default RewardItem;
