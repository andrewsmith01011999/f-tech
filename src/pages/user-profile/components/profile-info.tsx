import { Avatar, Button, Dropdown, Flex, Image, Space, Typography } from 'antd';
import BackgroundPlaceholder from '/public/background-placeholder.svg';
import AvatarPlaceholder from '/public/avatar-placeholder.svg';
import { useSelector } from 'react-redux';
import { RootState } from '@/stores';
import { EllipsisOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
interface ProfileInfoProps {
    setIsShowReportReasons: (value: boolean) => void;
}

export const ProfileInfo = ({ setIsShowReportReasons }: ProfileInfoProps) => {
    const { accountInfo } = useSelector((state: RootState) => state.account);

    return (
        <Flex vertical gap={92}>
            <div style={{ position: 'relative' }}>
                <Image
                    src={accountInfo?.coverImage || BackgroundPlaceholder}
                    alt="logo"
                    width="100%"
                    height={260}
                    style={{ objectFit: 'cover' }}
                />
                <Avatar
                    shape="circle"
                    size={136}
                    src={accountInfo?.avatar || AvatarPlaceholder}
                    style={{ position: 'absolute', top: 200, left: 20 }}
                />

                <Dropdown
                    menu={{
                        items: [
                            {
                                key: '1',
                                icon: <ExclamationCircleOutlined />,
                                label: 'Report',
                                onClick: () => setIsShowReportReasons(true),
                            },
                        ],
                    }}
                >
                    <Button
                        icon={<EllipsisOutlined />}
                        variant="outlined"
                        style={{ position: 'absolute', top: 280, right: 20 }}
                    />
                </Dropdown>
            </div>
            <Flex vertical gap={8}>
                <Typography.Title level={4}>{accountInfo?.username}</Typography.Title>
                <Typography.Text type="secondary">@{accountInfo?.username}</Typography.Text>
                <Typography.Text>#Beingnobody_goingnowhere.</Typography.Text>
                <Flex gap={24}>
                    <Space size="small">
                        <Typography.Text>100</Typography.Text>
                        <Typography.Text type="secondary">Followings</Typography.Text>
                    </Space>

                    <Space>
                        <Typography.Text>118</Typography.Text>
                        <Typography.Text type="secondary">Followers</Typography.Text>
                    </Space>
                </Flex>
            </Flex>
        </Flex>
    );
};
