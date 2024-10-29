import { OnAction } from '@/types';
import { Button, Space } from 'antd';
import { FC } from 'react';

interface IconButtonProps {
    icon: React.ReactNode;
    children: React.ReactNode;
    onClick?: OnAction
}

export const IconButton: FC<IconButtonProps> = ({ icon, children, onClick }) => {
    return (
        <Button type="text" size="small" onClick={onClick}>
            <Space align="center">
                {icon}
                {children}
            </Space>
        </Button>
    );
};
