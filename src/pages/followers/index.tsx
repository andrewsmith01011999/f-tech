import { Card, Divider, Empty, Flex, Typography } from 'antd';

import PageBreadcrumbs from '@/components/core/page-breadcrumbs';
import { useGetFollowers } from '@/hooks/query/follow/use-follow-listing';
import { useGetRecommendations } from '@/hooks/query/follow/use-follow-top-accounts';

import { FollowItem } from '../followings/component/follow-item';
import { EventsWrapper } from '../home/layout/events-wrapper';

const FollowerPage = () => {
    const { data: followers } = useGetFollowers();

    return (
        <Card>
            <PageBreadcrumbs />
            <Divider />
            <Flex vertical gap={20}>
                <Typography.Title level={4}>Followers</Typography.Title>
                <EventsWrapper>
                    {followers?.length ? (
                        followers?.map(account => (
                            <FollowItem key={account?.accountId} account={account} isFollow={false} />
                        ))
                    ) : (
                        <Empty description="No recommendation" />
                    )}
                </EventsWrapper>
            </Flex>
        </Card>
    );
};

export default FollowerPage;
