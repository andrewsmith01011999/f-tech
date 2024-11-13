import PageBreadcrumbs from '@/components/core/page-breadcrumbs';
import { useGetFollows } from '@/hooks/query/follow/use-follow-listing';
import { useGetFollowTopAccounts } from '@/hooks/query/follow/use-follow-top-accounts';
import { Card, Divider, Empty, Flex } from 'antd';
import React from 'react';
import { RecommendedItem } from '../home/components/recommended-item';
import { EventsWrapper } from '../home/layout/events-wrapper';

const RecommendationsPage = () => {
    const { data: topAccounts } = useGetFollowTopAccounts();
    const { data: follows } = useGetFollows();

    return (
        <Card>
            <PageBreadcrumbs />
            <Divider />
            <EventsWrapper>
                {topAccounts?.length ? (
                    topAccounts?.map(account => (
                        <RecommendedItem key={account?.accountId} account={account} follows={follows} />
                    ))
                ) : (
                    <Empty description="No recommendation" />
                )}
            </EventsWrapper>
        </Card>
    );
};

export default RecommendationsPage;
