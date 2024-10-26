import { Account } from '@/types/account';
import { Avatar, Flex, Typography } from 'antd';
import { FC } from 'react';

interface UserInfoProps {
    account: Account;
}

export const UserInfo: FC<UserInfoProps> = ({ account }) => {
    return (
        <Flex align="center">
            <Avatar size={40} shape="circle" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            <Flex vertical>
                <Typography.Text>{account?.username}</Typography.Text>
                <Typography.Text type="secondary">@{account?.username?.toLowerCase()}</Typography.Text>
            </Flex>
        </Flex>
    );
};
