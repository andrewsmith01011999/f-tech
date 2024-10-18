import { Button, Card, Dropdown, Flex, Image, Modal, Typography } from 'antd';
import { UserInfo } from '../user/user-info';
import { PostTag } from './post-tag';
import {
    BarChartOutlined,
    CommentOutlined,
    DeleteOutlined,
    EditOutlined,
    EllipsisOutlined,
    EyeInvisibleOutlined,
    GlobalOutlined,
    KeyOutlined,
    LikeOutlined,
    ShareAltOutlined,
} from '@ant-design/icons';
import { IconButton } from './icon-button';
import { useDispatch } from 'react-redux';
import { setPost } from '@/stores/post';
import { useDeletePost } from '@/hooks/mutate/post/use-delete-post';
import { Post } from '@/types/post/post';
import { FC } from 'react';
import dayjsConfig from '@/utils/dayjs';
import { useSearchParams } from 'react-router-dom';


const { confirm } = Modal;

interface PostItemProps {
    data: Post;
}

export const PostItem: FC<PostItemProps> = ({ data }) => {
    const dispatch = useDispatch();

    const [searchParams] = useSearchParams()

    const { mutate: deletePost, isPending: isPendingDeletePost } = useDeletePost('1');

    const handleUpdate = () => {
        dispatch(setPost({ modal: { open: true, type: 'update' }, id: '1' }));
    };

    const handleDelete = () => {
        dispatch(setPost({ id: '1' }));
        confirm({
            title: 'Are you sure you want to delete this post?',
            content: 'This action cannot be undone',
            onOk() {
                deletePost();
            },
            okButtonProps: {
                disabled: isPendingDeletePost,
            },
        });
    };

    const { title, content, createdDate  } = data;

    return (
        <Card>
            <Flex vertical gap={8}>
                <Flex justify="space-between" align="flex-start">
                    <Flex align="center" gap={8}>
                        <UserInfo />
                        <PostTag>Inquiry</PostTag>
                    </Flex>
                    <Dropdown
                        menu={{
                            items: [
                                {
                                    key: '1',
                                    icon: <GlobalOutlined />,
                                    label: <span>Public</span>,
                                    children: [
                                        {
                                            key: '1.1',
                                            icon: <GlobalOutlined />,
                                            label: <span>Public</span>,
                                        },
                                        {
                                            key: '1.2',
                                            icon: <KeyOutlined />,
                                            label: <span>Private</span>,
                                        },
                                        {
                                            key: '1.3',
                                            icon: <EyeInvisibleOutlined />,
                                            label: <span>Hide</span>,
                                        },
                                    ],
                                },
                                {
                                    key: '2',
                                    icon: <DeleteOutlined />,
                                    label: <span>Delete post</span>,
                                    onClick: handleDelete,
                                },
                                {
                                    key: '3',
                                    icon: <EditOutlined />,
                                    label: <span>Edit post</span>,
                                    onClick: handleUpdate,
                                },
                            ],
                        }}
                    >
                        <Button type="text" icon={<EllipsisOutlined style={{ fontSize: 20 }} />} />
                    </Dropdown>
                </Flex>

                <Typography.Title
                    level={4}
                    style={{
                        textDecoration: 'underline',
                        cursor: 'pointer',
                    }}
                >
                    {title}
                </Typography.Title>

                <Typography.Paragraph
                    ellipsis={{
                        rows: 8,
                        expandable: true,
                        symbol: <Button type="link">more</Button>,
                    }}
                >
                    {content}
                </Typography.Paragraph>

                <Image
                    src="/placeholder.svg"
                    alt="iPhone 16 Pro"
                    width={400}
                    height={400}
                    style={{
                        objectFit: 'contain',
                    }}
                />
                <Typography.Text type="secondary">Posted {dayjsConfig(createdDate).fromNow()}</Typography.Text>

                <Flex justify="end" gap={20}>
                    <IconButton icon={<LikeOutlined />} children="Like" />
                    <IconButton icon={<CommentOutlined />} children="Comment" />
                    <IconButton icon={<BarChartOutlined />} children="1.9M" />
                    <IconButton icon={<ShareAltOutlined />} children="Share" />
                </Flex>
            </Flex>
        </Card>
    );
};
