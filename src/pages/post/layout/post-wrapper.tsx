import { SecondaryButton } from '@/components/core/secondary-button';
import { Avatar, Divider, Dropdown, Flex, Input, Modal, Space, Tag } from 'antd';
import { FC } from 'react';
import { CreatePost } from '../components/create-post';
import { CaretDownFilled } from '@ant-design/icons';
import { TagListingParams, useTagsListing } from '@/hooks/query/tag/use-tags-listing';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/consts/common';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { PostModalType, setPost } from '@/stores/post';
import { RootState } from '@/stores';

interface PostWrapperProps {
    children: React.ReactNode;
}

const initialParams: TagListingParams = {
    page: DEFAULT_PAGE,
    perPage: DEFAULT_PAGE_SIZE,
};

export const PostWrapper: FC<PostWrapperProps> = ({ children }) => {
    const dispatch = useDispatch()
    const { type, open } = useSelector((state: RootState) => state.post.modal);

    const { data: tagsData, isLoading: loadingTags } = useTagsListing({ params: initialParams });

    const handleCancel = (type: PostModalType) => {
        dispatch(setPost({ modal: { open: false, type } }));
    };

    const handleOpen = (type: PostModalType) => {
        dispatch(setPost({ modal: { open: true, type } }));
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
                        onClick={() => handleOpen('create')}
                        readOnly
                    />
                    <SecondaryButton onClick={() => handleOpen('create')}>Create Post</SecondaryButton>
                </Flex>
            </Flex>

            <Divider />

            <Flex vertical gap={20}>
                {children}
            </Flex>

            <Modal
                title="Create Post"
                open={type === 'create' && open}
                onCancel={() => handleCancel('create')}
                footer={null}
                width={'80vw'}
            >
                <CreatePost onCancel={() => handleCancel('create')} />
            </Modal>

            <Modal
                title="Update Post"
                open={type === 'update' && open}
                onCancel={() => handleCancel('update')}
                footer={null}
                width={'80vw'}
            ></Modal>
        </Flex>
    );
};
