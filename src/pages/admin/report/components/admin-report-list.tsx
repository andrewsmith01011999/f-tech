import { useFeedbackListing } from '@/hooks/query/feedback/use-feedback-listing';
import { Button, Checkbox, Empty, Flex, GetProp, Popover, Tag, Typography } from 'antd';
import React from 'react';
import AdminFeedbackWrapper from '../../feedback/layout/admin-feedback-wrapper';
import AdminFeedbackItem from '../../feedback/components/admin-feedback-item';
import { PostReportParams, useReportPostsListing } from '@/hooks/query/report/use-report-posts';
import AdminReportItem from './admin-report-item';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/consts/common';
import { FilterOutlined } from '@ant-design/icons';
import { mapFeedbackStatusColor } from '../../feedback/utils/map-feedback-status-color';
import { FeedbackStatus } from '@/types/feedback/feedback';

const AdminReportList = () => {
    const initialParams: PostReportParams = {
        page: DEFAULT_PAGE,
        perPage: DEFAULT_PAGE_SIZE,
    };

    const [selectedStatus, setSelectedStatus] = React.useState<string[]>([]);
    const [params, setParams] = React.useState<PostReportParams>(initialParams);

    const { data: reportPosts } = useReportPostsListing({
        params,
    });

    const optionsWithDisabled = [
        {
            label: (
                <Tag
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 24,
                        fontSize: 12,
                    }}
                    color={mapFeedbackStatusColor('PENDING')}
                >
                    PENDING
                </Tag>
            ),
            value: 'PENDING',
        },
        {
            label: (
                <Tag
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 24,
                        fontSize: 12,
                    }}
                    color={mapFeedbackStatusColor('REJECTED')}
                >
                    REJECTED
                </Tag>
            ),
            value: 'REJECTED',
        },
        {
            label: (
                <Tag
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 24,
                        fontSize: 12,
                    }}
                    color={mapFeedbackStatusColor('APPROVED')}
                >
                    APPROVED
                </Tag>
            ),
            value: 'APPROVED',
        },
    ];

    const onChange: GetProp<typeof Checkbox.Group, 'onChange'> = checkedValues => {
        setSelectedStatus(checkedValues as string[]);
    };

    const content = (
        <Flex vertical justify="center" align="center" gap={12}>
            <Typography.Title level={5}>STATUS</Typography.Title>
            <Checkbox.Group onChange={onChange}>
                <Flex vertical gap={8}>
                    {optionsWithDisabled.map(option => (
                        <Checkbox key={option.value} value={option.value}>
                            {option.label}
                        </Checkbox>
                    ))}
                </Flex>
            </Checkbox.Group>

            <Button
                type="primary"
                onClick={() =>
                    setParams({
                        ...params,
                        reportPostStatusList: selectedStatus as FeedbackStatus[],
                    })
                }
            >
                Apply
            </Button>
        </Flex>
    );

    return (
        <AdminFeedbackWrapper>
            <Flex justify="space-between">
                <div></div>

                <Popover content={content} trigger="click" arrow={false}>
                    <Button icon={<FilterOutlined />}>Filter</Button>
                </Popover>
            </Flex>

            {reportPosts ? (
                reportPosts.map(reportPost => <AdminReportItem key={reportPost.reportId} data={reportPost} />)
            ) : (
                <Empty />
            )}
        </AdminFeedbackWrapper>
    );
};

export default AdminReportList;
