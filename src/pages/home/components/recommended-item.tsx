import { Button, Flex, Image, Typography } from 'antd';
import AmdSvg from '/public/amd.svg';
import { PlusOutlined } from '@ant-design/icons';
import { Account } from '@/types/account';

interface RecommendedItemProps {
    account: Account;
}

export const RecommendedItem = ({ account }: RecommendedItemProps) => {
    return (
        <Flex align="flex-start" gap={10}>
            <Image
                style={{
                    borderRadius: 10,
                    width: 58,
                    height: 58,
                    objectFit: 'contain',
                    boxShadow: '0px 3px 4px 0px #FA89240F',
                }}
                src={account?.avatar || AmdSvg}
                alt="creator"
                preview={false}
            />

            <Flex gap={10}>
                <Flex vertical style={{ minWidth: 94 }}>
                    <Typography.Text>{account?.username}</Typography.Text>
                    <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                        {account?.handle}
                    </Typography.Text>
                </Flex>

                <Button type="primary" size="small">
                    <PlusOutlined style={{ fontSize: 12 }} />
                    Follow
                </Button>
            </Flex>
        </Flex>
    );
};
