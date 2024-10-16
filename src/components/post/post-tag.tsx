import { themeConfig } from '@/consts/token';
import { ConfigProvider, Tag } from 'antd';
import { FC } from 'react';

interface PostTagProps {
    children: React.ReactNode;
}

export const PostTag: FC<PostTagProps> = ({ children }) => {
    return (
        <ConfigProvider
            theme={{
                ...themeConfig,
                components: {
                    ...themeConfig.components,
                    Tag: {
                        ...themeConfig.components!.Tag,
                        colorBgContainer: '#518EF8',
                        colorText: 'white',
                        fontSizeSM: 14,
                    },
                },
            }}
        >
            <Tag>{children}</Tag>
        </ConfigProvider>
    );
};
