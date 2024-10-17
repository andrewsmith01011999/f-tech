import { FC } from 'react';
import { PostSummary } from './components/post-summary';
import { PostWrapper } from './layout/post-wrapper';

const HomePage: FC = props => {
    return (
        <PostWrapper>
            {Array.from({ length: 3 }).map((_, index) => (
                <PostSummary key={index} />
            ))}
        </PostWrapper>
    );
};

export default HomePage;
