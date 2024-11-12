import PageBreadcrumbs from '@/components/core/page-breadcrumbs';
import { PostItem } from '@/components/post/post-item';
import { useGetPost } from '@/hooks/query/post/use-get-post';
import { Card, Divider } from 'antd';
import React from 'react';
import { useParams } from 'react-router-dom';

const PostDetailPage = () => {
    const { id } = useParams();

    const { data } = useGetPost(id || '');

    return (
        <Card>
            <PageBreadcrumbs />
            <Divider />
            {data && <PostItem data={data} showComment={true} />}
        </Card>
    );
};

export default PostDetailPage;
