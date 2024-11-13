import { Button, Flex, Image, Typography } from 'antd';
import AmdSvg from '/public/amd.svg';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Account } from '@/types/account';
import { Follow } from '@/types/follow';
import { useSelector } from 'react-redux';
import { RootState } from '@/stores';
import { useCreateFollow } from '@/hooks/mutate/follow/use-create-follow';
import { useDeleteFollow } from '@/hooks/mutate/follow/use-delete-follow';
import { useQueryClient } from '@tanstack/react-query';
import { followKeys } from '@/consts/factory/follow';

interface RecommendedItemProps {
    account: Account;
    follows?: Follow[];
}

export const RecommendedItem = ({ account, follows }: RecommendedItemProps) => {
    const { accountInfo } = useSelector((state: RootState) => state.account);

    const { mutate: createFollow, isPending: isPendingCreateFollow } = useCreateFollow();
    const { mutate: deleteFollow, isPending: isPendingDeleteFollow } = useDeleteFollow();

    const queryClient = useQueryClient();

    const handleCreateFollow = (accountId: string) => {
        createFollow(accountId, {
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: followKeys.listing(),
                });
            },
        });
    };

    const handleDeleteFollow = (accountId: string) => {
        deleteFollow(
            {
                accountId: accountId,
            },
            {
                onSuccess: () => {
                    queryClient.invalidateQueries({
                        queryKey: followKeys.listing(),
                    });
                },
            },
        );
    };

    return (
        <Flex align="flex-start" gap={10} justify="space-between">
            <Flex gap={10}>
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

                <Flex vertical style={{ minWidth: 94 }}>
                    <Typography.Text>{account?.username}</Typography.Text>
                    <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                        {account?.handle}
                    </Typography.Text>
                </Flex>
            </Flex>

            {follows?.find(follow => follow?.follower?.accountId === accountInfo?.accountId) ? (
                <Button type="primary" size="small" onClick={() => handleDeleteFollow(account?.accountId)}>
                    <MinusOutlined style={{ fontSize: 12 }} />
                    Unfollow
                </Button>
            ) : (
                <Button type="primary" size="small" onClick={() => handleCreateFollow(account?.accountId)}>
                    <PlusOutlined style={{ fontSize: 12 }} />
                    Follow
                </Button>
            )}
        </Flex>
    );
};
