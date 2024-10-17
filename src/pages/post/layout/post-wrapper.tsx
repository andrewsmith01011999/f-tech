import { SecondaryButton } from '@/components/core/secondary-button';
import { Avatar, Divider, Dropdown, Flex, Input, Modal, Space, Tag } from 'antd';
import { FC, useState } from 'react';
import { CreatePost } from '../components/create-post';
import { CaretDownFilled } from '@ant-design/icons';
import { TagListingParams, useTagsListing } from '@/hooks/query/use-tags-listing';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/consts/common';

interface PostWrapperProps {
    children: React.ReactNode;
}

const initialParams: TagListingParams = {
    page: DEFAULT_PAGE,
    perPage: DEFAULT_PAGE_SIZE,
};

export const PostWrapper: FC<PostWrapperProps> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const { data: tagsData, isLoading: loadingTags } = useTagsListing({ params: initialParams });

    const handleCancel = () => {
        setIsOpen(false);
    };

    const handleOpen = () => {
        setIsOpen(true);
    };

    return (
        <Flex vertical gap={10}>
            <Flex gap={10} style={{ width: '100%' }} align="center">
                <Dropdown
                    menu={{
                        items: [
                            {
                                key: '1',
                                label: (
                                    <Space align="center">
                                        <Tag
                                            style={{
                                                minHeight: 32,
                                                minWidth: 100,
                                                fontSize: 14,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            All
                                        </Tag>
                                       
                                    </Space>
                                ),
                            },
                        ],
                    }}
                >
                    <SecondaryButton icon={<CaretDownFilled />} loading={loadingTags}>
                        Tags
                    </SecondaryButton>
                </Dropdown>
                <Flex gap={6} flex={1} align="center">
                    <Avatar
                        size={48}
                        shape="circle"
                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                    />
                    <Input
                        size="large"
                        placeholder="Let's share what going on your mind..."
                        onClick={handleOpen}
                        readOnly
                    />
                    <SecondaryButton onClick={handleOpen}>Create Post</SecondaryButton>
                </Flex>
            </Flex>

            <Divider />

            <Flex vertical gap={20}>
                {children}
            </Flex>

            <Modal title="Create Post" open={isOpen} onCancel={handleCancel} footer={null} width={'80vw'}>
                <CreatePost onCancel={handleCancel} />
            </Modal>
        </Flex>
    );
};
