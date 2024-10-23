import React from 'react';
import { PaginationParams } from '@/types';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/consts/common';
import { usePostsListing } from '@/hooks/query/post/use-posts-listing';
import { Button, Divider, Empty, Flex, Form } from 'antd';
import { PostItem } from '@/components/post/post-item';
import { PostStatus } from '@/types/post/post';
import { PostWrapper } from '@/pages/home/layout/post-wrapper';
import { sortBy } from 'lodash';

interface FormFieldValues {
    post: {
        postId: string;
        checked: boolean;
    };
}

const DraftList = () => {
    const [form] = Form.useForm();

    const initialParams: PaginationParams = {
        page: DEFAULT_PAGE,
        perPage: DEFAULT_PAGE_SIZE,
    };

    const { data } = usePostsListing({
        params: {
            ...initialParams,
            // statuses: [PostStatus.DRAFT],
        },
    });

    if (!data || data.entity.length === 0) {
        return <Empty />;
    }

    const handleSelectAll = () => {
        console.log(
            sortBy(data.entity, 'createdDate').map(post => ({
                postId: post.postId,
                checked: true,
            })),
        );
        form.setFieldValue(
            'post',
            sortBy(data.entity, 'createdDate').map(post => ({
                postId: post.postId,
                checked: true,
            })),
        );
    };

    const onFinish = (values: FormFieldValues) => {
        console.log(values);
    };

    return (
        <PostWrapper>
            {/* {data.entity.map(post => ( */}
            <Form<FormFieldValues>
                name="draft"
                form={form}
                initialValues={{
                    post: sortBy(data.entity, 'createdDate').map(post => ({
                        postId: post.postId,
                    })),
                }}
                onFinish={onFinish}
            >
                <Form.List name="post">
                    {fields => (
                        <PostWrapper>
                            {fields.map((field, index) => (
                                <PostItem
                                    data={data.entity[index]}
                                    key={field.key}
                                    showActions={false}
                                    showCheckbox
                                    field={field}
                                />
                            ))}
                        </PostWrapper>
                    )}
                </Form.List>
                {/* <PostItem data={post} key={post.postId} showActions={false} showCheckbox /> */}
            </Form>
            {/* ))} */}

            <Divider />

            <Flex justify="space-between">
                <Button size="large" type="link" onClick={handleSelectAll}>
                    Select All
                </Button>
                <Button size="large" danger type="link">
                    Delete
                </Button>
            </Flex>
        </PostWrapper>
    );
};

export default DraftList;
