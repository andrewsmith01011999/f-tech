import { PostTab } from '@/components/post/post-tab';
import { TabsProps } from 'antd';
import { PostWrapper } from './layout/post-wrapper';
import { PostItem } from '@/components/post/post-item';

const PostPage = () => {
    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Home',
            children: (
                <PostWrapper>
                    <PostItem />
                    <PostItem />
                    <PostItem />
                </PostWrapper>
            ),
        },
        {
            key: '2',
            label: 'Explore',
            children: (
                <PostWrapper>
                    <PostItem />
                    <PostItem />
                    <PostItem />
                </PostWrapper>
            ),
        },
    ];

    return (
        <>
            <PostTab items={items} defaultActiveKey='1' />
        </>
    );
};

export default PostPage;
