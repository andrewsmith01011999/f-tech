import { setAccountState } from '@/stores/account';
import { Account } from '@/types/account';
import { Avatar, Flex, Typography } from 'antd';
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

interface UserInfoProps {
    account: Account;
}

export const UserInfo: FC<UserInfoProps> = ({ account }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleNavigate = () => {
        navigate(`/user-profile/${account?.accountId}`);
        dispatch(setAccountState({ userInfo: account }));
    };

    return (
        <Flex align="center" onClick={handleNavigate}>
            <Avatar size={40} shape="circle" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            <Flex vertical>
                <Typography.Text>{account?.username}</Typography.Text>
                <Typography.Text type="secondary">@{account?.username?.toLowerCase()}</Typography.Text>
            </Flex>
        </Flex>
    );
};
