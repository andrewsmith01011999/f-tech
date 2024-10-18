import { UserInfo } from '@/components/user/user-info';
import { Button, Card, Flex, Form, Input, message, Space, Upload } from 'antd';
import GallerySvg from '/public/gallery.svg';
import EmojiSvg from '/public/emoji.svg';
import { OnAction } from '@/types';
import { FC } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { postKeys } from '@/consts/factory/post';
import { UpdatePostPayload } from '@/types/post/post';
import { useMessage } from '@/hooks/use-message';
import { useUpdatePost } from '@/hooks/mutate/post/use-update-post';
import { useGetPost } from '@/hooks/query/post/use-get-post';
import { useSelector } from 'react-redux';
import { RootState } from '@/stores';

interface UpdatePostProps {
    onCancel?: OnAction;
}

export const UpdatePost: FC<UpdatePostProps> = ({ onCancel }) => {
    const [form] = Form.useForm();

    const queryClient = useQueryClient();
    const { success } = useMessage();
    const id = useSelector((state: RootState) => state.post.id);

    const {data: detail} = useGetPost(id ?? '');
    const { mutate: updatePost, isPending: isPendingUpdatePost } = useUpdatePost(id ?? '', {
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: postKeys.listing(),
            });
        },
    });

    const onFinish = (values: UpdatePostPayload) => {
        updatePost(values, {
            onSuccess: () => {
                success('Post updated successfully!');
                onCancel && onCancel();
                form.resetFields();
            },
            onError: error => {
                message.error(error.message);
            },
        });
    };

    const initialValues = {
        title: detail?.title,
        content: detail?.content,
    }

    return (
        <Card>
            <Flex vertical gap={10}>
                <UserInfo />

                <Form<UpdatePostPayload> layout="vertical" form={form} name="updatePost" onFinish={onFinish} initialValues={initialValues}>
                    <Form.Item<UpdatePostPayload>
                        name="title"
                        label="Title"
                        rules={[{ required: true, message: 'Please enter post title!' }]}
                    >
                        <Input size="large" placeholder="Post title goes here..." />
                    </Form.Item>

                    <Form.Item<UpdatePostPayload> name="content" label="Description">
                        <Input.TextArea size="large" rows={5} placeholder="Let's share what going on your mind..." />
                    </Form.Item>
                </Form>

                <Flex align="center" justify="space-between">
                    <Space size="large">
                        <Upload>
                            <Button type="text" icon={<img src={GallerySvg} />} />
                        </Upload>
                        <Button type="text" icon={<img src={EmojiSvg} />} />
                    </Space>

                    <Space>
                        <Button form="updatePost">Complete Draft</Button>

                        <Button loading={isPendingUpdatePost} form="updatePost" type="primary" htmlType="submit">
                            Update
                        </Button>
                    </Space>
                </Flex>
            </Flex>
        </Card>
    );
};
