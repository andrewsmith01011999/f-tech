import { Button, Card, Dropdown, Flex, Image, Typography } from 'antd';
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

export const PostItem = () => {
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
                                },
                                {
                                    key: '3',
                                    icon: <EditOutlined />,
                                    label: <span>Edit post</span>,
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
                    How to create a new project?
                </Typography.Title>

                <Typography.Paragraph
                    ellipsis={{
                        rows: 8,
                        expandable: true,
                        symbol: <Button type="link">more</Button>,
                    }}
                >
                    The iPhone 16 Pro and its bigger 16 Pro Max are now official. Apple's latest flagship smartphone
                    features larger 6.3-inch and 6.9-inch displays (both models are now 0.2-inch bigger), better battery
                    life, a new color, the Apple A18 Pro processor, and more. Like the standard iPhone 16, this year's
                    pro lineup features Apple's new Camera Control—a special element that combines a physical button
                    with a touch-capacitive surface for advanced camera controls. The Camera Control makes it easier to
                    launch the camera, take a photo, start video recording, and adjust zoom, exposure, or depth of
                    field. In addition, Apple promises to update Camera Control with a two-stage shutter for focus and
                    exposure-locking.
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
                <Typography.Text type="secondary">Posted 2 days ago</Typography.Text>

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
