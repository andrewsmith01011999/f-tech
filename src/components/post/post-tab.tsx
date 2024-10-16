import { Tabs, TabsProps } from 'antd';
import { FC } from 'react';

interface PostTabProps extends TabsProps {}

export const PostTab: FC<PostTabProps> = props => {
    return <Tabs {...props} centered tabBarGutter={240} />;
};
