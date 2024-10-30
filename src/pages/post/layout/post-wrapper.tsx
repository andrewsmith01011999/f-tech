import { SecondaryButton } from '@/components/core/secondary-button';
import { Avatar, Breadcrumb, Button, Card, Divider, Dropdown, Flex, Input, Modal, Space, Tag } from 'antd';
import React, { FC, useState } from 'react';
import { CreatePost } from '../components/create-post';
import { CaretDownFilled, RightOutlined } from '@ant-design/icons';
import { TagListingParams, useTagsListing } from '@/hooks/query/tag/use-tags-listing';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/consts/common';
import { useDispatch } from 'react-redux';
import { PostModalType, setPost } from '@/stores/post';
import TagXSvg from '/public/tag-x.svg';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { UpdatePost } from '../components/update-post';
import DraftList from '../components/draft-list';
import { useTopicsListing } from '@/hooks/query/topic/use-topics-listing';
import { ReportAccountReasons, reportAccountReasons } from '@/types/report/report';
import { useCreateReport, useCreateReportPost } from '@/hooks/mutate/report/use-create-report';
import { useSelector } from 'react-redux';
import { RootState } from '@/stores';
import { useMessage } from '@/hooks/use-message';
import ReportReason from '@/pages/user-profile/components/report-reason';

interface PostWrapperProps {
    children: React.ReactNode;
    showHeader?: boolean;
}

const initialParams: TagListingParams = {
    page: DEFAULT_PAGE,
    perPage: DEFAULT_PAGE_SIZE,
};

export const PostWrapper: FC<PostWrapperProps> = ({ children, showHeader = true }) => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const { success } = useMessage();
    const dispatch = useDispatch();
    const { id, modal } = useSelector((state: RootState) => state.post);

    const [history, setHistory] = useState<string>('');
    const [openDraft, setOpenDraft] = useState<boolean>(false);
    const [selectedReason, setSelectedReason] = useState<ReportAccountReasons>();

    const { mutate: createReport, isPending: isPendingCreateReport } = useCreateReportPost(id || '');
    const { data: topics } = useTopicsListing({ params: initialParams });
    const { data: tagsData, isLoading: loadingTags } = useTagsListing({ params: initialParams });
    const pathSnippets = location.pathname.split('/').filter(i => i);
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;

        return {
            path: url,
            breadcrumbName: (
                <Link to={url} onClick={() => setHistory(location.pathname)}>
                    {url.split('/').splice(-1)?.[0]}
                </Link>
            ),
        };
    });

    const breadcrumbItems = [
        {
            ...(location.pathname.split('/').length > 1 && {
                path: '-1',
                breadcrumbName: (
                    <Button
                        size="small"
                        type="text"
                        icon={<img src={TagXSvg} alt="tag-x" />}
                        onClick={() => {
                            setHistory(location.pathname);
                            navigate(-1);
                        }}
                    />
                ),
            }),
        },
        ...extraBreadcrumbItems,
        {
            ...(location.pathname.length < history.length &&
                history.includes(location.pathname) && {
                    path: '1',
                    breadcrumbName: <RightOutlined onClick={() => navigate(history)} />,
                }),
        },
    ];

    const handleCancel = (type: PostModalType) => {
        dispatch(setPost({ modal: { open: false, type } }));
    };

    const handleOpen = (type: PostModalType) => {
        dispatch(setPost({ modal: { open: true, type } }));
    };

    const topicId = searchParams.get('topicId') || undefined;
    const tagId = searchParams.get('tagId') || undefined;

    const handleSelectTag = (id: string | undefined) => {
        setSearchParams(params => ({ ...params, ...(topicId && { topicId }), tagId: id }));
    };

    const handleSelectTopic = (id: string | undefined) => {
        setSearchParams(params => ({ ...params, topicId: id, ...(tagId && { tagId }) }));
    };

    const handleReportAccount = () => {
        if (!selectedReason) {
            return;
        }

        createReport(selectedReason, {
            onSuccess: () => {
                success('Reported successfully!');
                dispatch(setPost({ modal: { open: false, type: 'report' } }));
            },
        });
    };

    return (
        <Flex vertical gap={10}>
            {showHeader && (
                <>
                    <Card>
                        <Breadcrumb>
                            {breadcrumbItems.map(item => (
                                <React.Fragment key={item.path}>
                                    <Breadcrumb.Item>{item.breadcrumbName}</Breadcrumb.Item>
                                </React.Fragment>
                            ))}
                        </Breadcrumb>

                        <Divider />

                        <Flex gap={10} style={{ width: '100%' }} align="center">
                            <Dropdown
                                menu={{
                                    items: [
                                        {
                                            key: '1',
                                            label: (
                                                <Space align="center">
                                                    <Tag
                                                        style={{
                                                            minHeight: 32,
                                                            minWidth: 100,
                                                            fontSize: 14,
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                        }}
                                                    >
                                                        All
                                                    </Tag>
                                                </Space>
                                            ),
                                            onClick: () => handleSelectTag(undefined),
                                        },
                                        ...(tagsData?.map(tag => ({
                                            key: tag.tagId,
                                            label: (
                                                <Space align="center">
                                                    <Tag
                                                        style={{
                                                            minHeight: 32,
                                                            minWidth: 100,
                                                            fontSize: 14,
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            backgroundColor: tag.backgroundColorHex,
                                                            color: tag.textColorHex,
                                                        }}
                                                    >
                                                        {tag.name}
                                                    </Tag>
                                                </Space>
                                            ),
                                            onClick: () => handleSelectTag(tag.tagId),
                                        })) || []),
                                    ],
                                    selectedKeys: [tagId || '1'],
                                }}
                            >
                                <SecondaryButton icon={<CaretDownFilled />} loading={loadingTags}>
                                    Tags
                                </SecondaryButton>
                            </Dropdown>
                            <Flex gap={6} flex={1} align="center">
                                <Avatar
                                    size={48}
                                    shape="circle"
                                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                />
                                <Input
                                    size="large"
                                    placeholder="Let's share what going on your mind..."
                                    onClick={() => handleOpen('create')}
                                    readOnly
                                />
                                <SecondaryButton onClick={() => handleOpen('create')}>Create Post</SecondaryButton>
                            </Flex>
                        </Flex>
                    </Card>

                    <Divider />

                    <Flex gap={10} align="center">
                        {topics?.map(topic => (
                            <Tag
                                key={topic.topicId}
                                style={{
                                    fontSize: 14,
                                    minHeight: 32,
                                    minWidth: 48,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    ...(topic.topicId === topicId && { backgroundColor: '#f0f0f0', color: '#000' }),
                                }}
                                onClick={() => handleSelectTopic(topic.topicId)}
                            >
                                {topic.name}
                            </Tag>
                        ))}
                    </Flex>

                    <Divider />
                </>
            )}

            <Flex vertical gap={20}>
                {children}
            </Flex>

            <CreatePost onCancel={() => handleCancel('create')} />

            <UpdatePost onCancel={() => handleCancel('update')} />

            <DraftList onCancel={() => handleCancel('draft')} />

            <Modal
                title="Report"
                open={modal.open && modal.type === 'report'}
                onCancel={() => handleCancel('report')}
                footer={null}
            >
                {reportAccountReasons.map((reason, index) => (
                    <ReportReason
                        key={index}
                        reason={reason}
                        selectedReason={selectedReason}
                        setSelectedReason={setSelectedReason}
                    />
                ))}

                <Flex justify="center">
                    <Button
                        type="primary"
                        onClick={handleReportAccount}
                        loading={isPendingCreateReport}
                        disabled={!selectedReason}
                    >
                        Submit
                    </Button>
                </Flex>
            </Modal>
        </Flex>
    );
};
