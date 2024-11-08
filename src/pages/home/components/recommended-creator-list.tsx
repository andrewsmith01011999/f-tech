import { Card, Empty, Flex } from 'antd';
import ArrowRightSvg from '/public/arrow-right.svg';
import { RecommendedItem } from './recommended-item';
import { EventsWrapper } from '../layout/events-wrapper';
import { useGetFollowTopAccounts } from '@/hooks/query/follow/use-follow-top-accounts';

export const RecommendedCreatorList = () => {
    const { data: topAccounts } = useGetFollowTopAccounts();

    return (
        <Card
            title={
                <Flex align="center" gap={4}>
                    Recommended creator
                    <img src={ArrowRightSvg} />
                </Flex>
            }
            style={{
                width: 326,
                height: 'fit-content',
            }}
            className="card-menu card-events"
        >
            <EventsWrapper>
                {topAccounts?.length ? (
                    topAccounts?.map(account => <RecommendedItem key={account?.accountId} account={account} />)
                ) : (
                    <Empty description="No recommendation" />
                )}
            </EventsWrapper>
        </Card>
    );
};
