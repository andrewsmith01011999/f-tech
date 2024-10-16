import { FC } from 'react';
import { PostSummary } from './components/post-summary';
import { PostWrapper } from './layout/post-wrapper';
import { CreatePost } from '../post/create-post';
import { PostItem } from '@/components/post/post-item';
import { PostTab } from '@/components/post/post-tab';

const HomePage: FC = props => {
    return (
        <PostWrapper>
            <PostTab />
            <PostItem />
            <CreatePost />
            {Array.from({ length: 10 }).map((_, index) => (
                <PostSummary key={index} />
            ))}
        </PostWrapper>
    );
};

export default HomePage;
