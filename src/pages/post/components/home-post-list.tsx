import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/consts/common';
import { usePostsListing } from '@/hooks/query/post/use-posts-listing';
import { PaginationParams } from '@/types';
import { PostWrapper } from '../layout/post-wrapper';
import { PostItem } from '@/components/post/post-item';
import { PostStatus } from '@/types/post/post';

export const HomePostList = () => {
    const initialParams: PaginationParams = {
        page: DEFAULT_PAGE,
        perPage: DEFAULT_PAGE_SIZE,
    };

    const { data } = usePostsListing({
        params: initialParams,
    });

    // if (!data || data.entity.length === 0) {
    //     return <Empty />;
    // }

    return (
        <PostWrapper>
            {/* {data.entity.map(post => (
                <PostItem data={post} key={post.postId} />
            ))} */}
            <PostItem
                data={{
                    postId: '1',
                    title: 'Title',
                    content: 'Content',
                    createdDate: '2021-09-01',
                    status: PostStatus.PUBLIC,
                    topic: {
                        name: 'Topic',
                        topicId: '1',
                    },
                    lastModifiedDate: '2021-09-01',
                }}
            />
        </PostWrapper>
    );
};
