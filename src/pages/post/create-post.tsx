import { UserInfo } from '@/components/user/user-info';
import { Button, Card, Flex, Form, Input, Space } from 'antd';
import GallerySvg from '/public/gallery.svg';
import EmojiSvg from '/public/emoji.svg';

export const CreatePost = () => {
    return (
        <Card>
            <Flex vertical gap={10}>
                <UserInfo />

                <Form layout="vertical">
                    <Form.Item
                        name="title"
                        label="Title"
                        rules={[{ required: true, message: 'Please enter post title!' }]}
                    >
                        <Input size="large" placeholder="Post title goes here..." />
                    </Form.Item>

                    <Form.Item name="description" label="Description">
                        <Input.TextArea size="large" rows={5} placeholder="Let's share what going on your mind..." />
                    </Form.Item>
                </Form>

                <Flex align="center" justify="space-between">
                    <Space size='large'>
                        <img src={GallerySvg} />
                        <img src={EmojiSvg} />
                    </Space>

                    <Button type="primary" htmlType="submit">
                        Post
                    </Button>
                </Flex>
            </Flex>
        </Card>
    );
};
