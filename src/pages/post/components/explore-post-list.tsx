import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/consts/common';
import { usePostsListing } from '@/hooks/query/post/use-posts-listing';
import { PaginationParams } from '@/types';
import { PostWrapper } from '../layout/post-wrapper';
import { PostItem } from '@/components/post/post-item';
import { Empty } from 'antd';
import { useSearchParams } from 'react-router-dom';

export const ExplorePostList = () => {
    const initialParams: PaginationParams = {
        page: DEFAULT_PAGE,
        perPage: DEFAULT_PAGE_SIZE,
    };

    const [searchParams, setSearchParams] = useSearchParams();

    const topicId = searchParams.get('topicId') || undefined;
    const tagId = searchParams.get('tagId') || undefined;

    const { data } = usePostsListing({
        params: {
            ...initialParams,
            tagId,
            topicId,
        },
    });

    return <PostWrapper>{data ? data.map(post => <PostItem data={post} key={post.postId} />) : <Empty />}</PostWrapper>;
};
