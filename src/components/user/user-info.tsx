import { Avatar, Flex, Typography } from 'antd';

export const UserInfo = () => {
    return (
        <Flex align='center'>
            <Avatar size={40} shape="circle" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            <Flex vertical>
                <Typography.Text>Crypto Miner VN</Typography.Text>
                <Typography.Text type="secondary">@cryptominervn</Typography.Text>
            </Flex>
        </Flex>
    );
};
