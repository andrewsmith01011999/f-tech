import { UserInfo } from '@/components/user/user-info';
import { Button, Card, Flex, Form, Input, message, Space, Upload, UploadFile, UploadProps } from 'antd';
import GallerySvg from '/public/gallery.svg';
import EmojiSvg from '/public/emoji.svg';
import { OnAction } from '@/types';
import { FC, useEffect, useState } from 'react';
import { useCreatePost } from '@/hooks/mutate/post/use-create-post';
import { useQueryClient } from '@tanstack/react-query';
import { postKeys } from '@/consts/factory/post';
import { CreatePostPayload } from '@/types/post/post';
import { useMessage } from '@/hooks/use-message';
import { useCreateDraftPost } from '@/hooks/mutate/post/use-create-draft-post';
import { useSearchParams } from 'react-router-dom';
import { useUploadFile } from '@/hooks/use-upload-file';

interface CreatePostProps {
    onCancel?: OnAction;
}

export const CreatePost: FC<CreatePostProps> = ({ onCancel }) => {
    const [form] = Form.useForm();

    const [searchParams] = useSearchParams();
    const queryClient = useQueryClient();
    const { success } = useMessage();

    const { imgUrl, imgUrlList, setImgUrlList, uploadFile } = useUploadFile();

    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const { mutate: createPost, isPending: isPendingCreatePost } = useCreatePost();
    const { mutate: createDraftPost, isPending: isPendingCreateDraftPost } = useCreateDraftPost();

    const onFinish = (values: CreatePostPayload) => {
        createPost({
            ...values,
            imageUrlList: fileList.map(file => ({
                url: file.url as string,
            })),
        }, {
            onSuccess: () => {
                success('Post created successfully!');
                queryClient.invalidateQueries({
                    queryKey: postKeys.listing(),
                });
                onCancel && onCancel();
                form.resetFields();
            },
            onError: error => {
                message.error(error.message);
            },
        });
    };

    const handleSaveDraft = () => {
        form.validateFields().then(values => {
            createDraftPost({
                ...values,
                imageUrlList: fileList.map(file => ({
                    url: file.url as string,
                })),
            }, {
                onSuccess: () => {
                    success('Post saved as draft successfully!');
                    queryClient.invalidateQueries({
                        queryKey: postKeys.listing(),
                    });
                    onCancel && onCancel();
                    form.resetFields();
                },
                onError: error => {
                    message.error(error.message);
                },
            });
        });
    };

    const onChangeFile: UploadProps['onChange'] = ({ file, fileList: newFileList }) => {
        setFileList(newFileList);
    };

    const onRemoveFile = (file: UploadFile) => {
        const index = fileList.indexOf(file);
        if (index > -1) {
            const newImgUrlList = imgUrlList.slice();
            newImgUrlList.splice(index, 1);
            setImgUrlList(newImgUrlList);
        }
    };

    useEffect(() => {
        const appendFieldFileList = fileList.map((file, index) => {
            return {
                ...file,
                url: imgUrlList[index],
            };
        })
        setFileList(appendFieldFileList);
    }, [imgUrlList])

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
                        <Upload
                            customRequest={uploadFile}
                            onChange={onChangeFile}
                            fileList={fileList}
                            onRemove={onRemoveFile}
                        >
                            <Button type="text" icon={<img src={GallerySvg} />} />
                        </Upload>
                        <Button type="text" icon={<img src={EmojiSvg} />} />
                    </Space>

                    <Space>
                        <Button loading={isPendingCreateDraftPost} htmlType="button" onClick={handleSaveDraft}>
                            Draft
                        </Button>

                        <Button loading={isPendingCreatePost} form="createPost" type="primary" htmlType="submit">
                            Post
                        </Button>
                    </Space>
                </Flex>
            </Flex>
        </Card>
    );
};
