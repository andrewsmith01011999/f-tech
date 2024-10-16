import { TabsProps } from 'antd';
import { ProfileInfo } from './components/profile-info';
import { BaseTab } from '@/components/core/tab';
import { PostItem } from '@/components/post/post-item';
import { PostWrapper } from '../home/layout/post-wrapper';
import { Medias } from './components/medias';

const ProfilePage = () => {
    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Posts',
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
            label: 'Replies',
            children: <div></div>,
        },
        {
            key: '3',
            label: 'Media',
            children: <Medias />,
        },
    ];

    return (
        <div>
            <ProfileInfo />
            <BaseTab items={items} defaultActiveKey='1' />
        </div>
    );
};

export default ProfilePage;
