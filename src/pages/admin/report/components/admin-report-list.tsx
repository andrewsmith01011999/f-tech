import { Button, Checkbox, Empty, Flex, GetProp, Input, Popover, Tag, Typography } from 'antd';
import React, { useEffect } from 'react';
import AdminFeedbackWrapper from '../../feedback/layout/admin-feedback-wrapper';
import { PostReportParams, useReportPostsListing } from '@/hooks/query/report/use-report-posts';
import AdminReportItem from './admin-report-item';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/consts/common';
import { FilterOutlined, SearchOutlined } from '@ant-design/icons';
import { mapFeedbackStatusColor } from '../../feedback/utils/map-feedback-status-color';
import { FeedbackStatus } from '@/types/feedback/feedback';
import { useDebounce } from '@/hooks/use-debounce';

const AdminReportList = () => {
    const initialParams: PostReportParams = {
        page: DEFAULT_PAGE,
        perPage: DEFAULT_PAGE_SIZE,
    };

    const [selectedStatus, setSelectedStatus] = React.useState<string[]>([]);
    const [params, setParams] = React.useState<PostReportParams>(initialParams);
    const [search, setSearch] = React.useState<string>('');

    const searchDebounce = useDebounce(search, 500);

    useEffect(() => {
        setParams({
            ...params,
            username: searchDebounce,
            page: DEFAULT_PAGE,
        });
    }, [searchDebounce]);

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
                        page: DEFAULT_PAGE,
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
                <div
                    style={{
                        position: 'relative',
                        minWidth: 360,
                    }}
                >
                    <Input
                        style={{
                            paddingLeft: 32,
                        }}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>

                <SearchOutlined
                    style={{
                        position: 'absolute',
                        top: 8,
                        left: 8,
                    }}
                />

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
