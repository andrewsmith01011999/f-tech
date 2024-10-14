import { Flex } from 'antd';
import { FC } from 'react';

interface PageWrapperProps {
    children: React.ReactNode;
}

export const PageWrapper: FC<PageWrapperProps> = ({ children }) => {
    return <Flex style={{
      padding: '20px 40px',
    }} gap={20}>{children}</Flex>;
};
