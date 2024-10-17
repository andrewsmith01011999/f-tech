import { UserInfo } from '@/components/user/user-info';
import { Button, Card, Flex, Form, Input, Space } from 'antd';
import GallerySvg from '/public/gallery.svg';
import EmojiSvg from '/public/emoji.svg';
import { OnAction } from '@/types';
import { FC } from 'react';
import { useCreatePost } from '@/hooks/mutate/use-create-post';
import { useQueryClient } from '@tanstack/react-query';
import { postKeys } from '@/consts/factory/post';
import { CreatePostPayload } from '@/types/post/post';

interface CreatePostProps {
    onCancel?: OnAction;
}

export const CreatePost: FC<CreatePostProps> = ({ onCancel }) => {
    const [form] = Form.useForm();

    const queryClient = useQueryClient();

    const { mutate: createPost, isPending: isPendingCreatePost } = useCreatePost({
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: postKeys.listing(),
            });
        },
    });

    const onFinish = (values: CreatePostPayload ) => {
        console.log('Success:', values);
        onCancel && onCancel();
    };

    return (
        <Card>
            <Flex vertical gap={10}>
                <UserInfo />

                <Form<CreatePostPayload> layout="vertical" form={form} name="createPost" onFinish={onFinish}>
                    <Form.Item<CreatePostPayload>
                        name="title"
                        label="Title"
                        rules={[{ required: true, message: 'Please enter post title!' }]}
                    >
                        <Input size="large" placeholder="Post title goes here..." />
                    </Form.Item>

                    <Form.Item<CreatePostPayload> name="content" label="Description">
                        <Input.TextArea size="large" rows={5} placeholder="Let's share what going on your mind..." />
                    </Form.Item>
                </Form>

                <Flex align="center" justify="space-between">
                    <Space size="large">
                        <img src={GallerySvg} />
                        <img src={EmojiSvg} />
                    </Space>

                    <Button form="createPost" type="primary" htmlType="submit">
                        Post
                    </Button>
                </Flex>
            </Flex>
        </Card>
    );
};
