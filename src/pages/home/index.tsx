import { FC } from 'react';
import { PostSummary } from './components/post-summary';
import { PostWrapper } from './layout/post-wrapper';
import { useTopicsListing } from '@/hooks/query/use-topics-listing';
import { Spin } from 'antd';

const HomePage: FC = props => {
    const { data, isLoading } = useTopicsListing({ params: { page: 1, perPage: 10 } });

    return (
        <Spin spinning={isLoading}>
            <PostWrapper>
                {Array.from({ length: 3 }).map((_, index) => (
                    <PostSummary key={index} />
                ))}
            </PostWrapper>
        </Spin>
    );
};

export default HomePage;
