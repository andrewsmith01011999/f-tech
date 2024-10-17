import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/consts/common';
import { usePostsListing } from '@/hooks/query/use-posts-listing';
import { PaginationParams } from '@/types';
import { PostWrapper } from '../layout/post-wrapper';
import { PostItem } from '@/components/post/post-item';

export const HomePostList = () => {
    const initialParams: PaginationParams = {
        page: DEFAULT_PAGE,
        perPage: DEFAULT_PAGE_SIZE,
    };

    const { data } = usePostsListing({
        params: initialParams,
    });

    return (
        <PostWrapper>
            <PostItem />
            <PostItem />
            <PostItem />
        </PostWrapper>
    );
};

