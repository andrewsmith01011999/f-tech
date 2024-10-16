import { SecondaryButton } from '@/components/core/secondary-button';
import { Avatar, Divider, Flex, Input, Modal, Tag } from 'antd';
import { FC, useState } from 'react';
import { CreatePost } from '../create-post';
import { CaretDownFilled } from '@ant-design/icons';

interface PostWrapperProps {
    children: React.ReactNode;
}

export const PostWrapper: FC<PostWrapperProps> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleCancel = () => {
        setIsOpen(false);
    };

    const handleOpen = () => {
        setIsOpen(true);
    };

    return (
        <Flex vertical gap={10}>
            <Flex gap={10} style={{ width: '100%' }} align="center">
                <SecondaryButton icon={<CaretDownFilled />}>Tags</SecondaryButton>
                <Flex gap={6} flex={1} align="center">
                    <Avatar
                        size={48}
                        shape="circle"
                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                    />
                    <Input size="large" placeholder="Let's share what going on your mind..." onClick={handleOpen} readOnly />
                    <SecondaryButton onClick={handleOpen}>Create Post</SecondaryButton>
                </Flex>
            </Flex>

            <Divider />

            <Flex gap={10} wrap align="center">
                <Tag
                    style={{
                        fontSize: 12,
                        padding: '4px 12px',
                    }}
                >
                    JavaScript
                </Tag>
                <Tag
                    style={{
                        fontSize: 12,
                        padding: '4px 12px',
                    }}
                >
                    Java
                </Tag>
            </Flex>

            <Flex vertical gap={20}>
                {children}
            </Flex>

            <Modal title="Create Post" open={isOpen} onCancel={handleCancel} footer={null} width={'80vw'}>
                <CreatePost onCancel={handleCancel} />
            </Modal>
        </Flex>
    );
};
