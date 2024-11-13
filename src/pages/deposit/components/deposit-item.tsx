import RewardCard from '@/components/core/reward-card';
import { SecondaryButton } from '@/components/core/secondary-button';
import { Pack } from '@/types/pack/pack';
import { Flex, Typography } from 'antd';
import PlaceholderSvg from '/public/placeholder.svg';

interface DepositItemProps {
    pack: Pack;
}

const DepositItem = ({ pack }: DepositItemProps) => {
    return (
        <Flex vertical>
            <RewardCard
                title={`${pack?.point} MC`}
                hoverable
                style={{ width: 348 }}
                cover={
                    <img
                        alt="example"
                        src={pack?.imgUrl || PlaceholderSvg}
                        style={{ height: 180, objectFit: 'cover' }}
                    />
                }
                className="deposit-item"
            >
                <Flex justify="space-between" align="center">
                    <Typography.Title level={4}>{pack?.price} VND</Typography.Title>

                    <SecondaryButton>Buy</SecondaryButton>
                </Flex>
            </RewardCard>
        </Flex>
    );
};

export default DepositItem;
