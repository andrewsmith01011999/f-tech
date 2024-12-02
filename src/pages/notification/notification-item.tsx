import { Notification } from '@/types/notification';
import { StarIcon } from '@/utils/asset';
import { css } from '@emotion/react';
import { Avatar, Card, Flex, Typography } from 'antd';
import dayjs from 'dayjs';
import { FC } from 'react';

interface NotificationItemProps {
    notification: Notification;
}

const NotificationItem = ({ notification }: NotificationItemProps) => {
    return (
        <Card css={styles}>
            <Flex vertical gap={6}>
                <Flex align="center" gap={10}>
                    <div>
                        <img src={StarIcon}></img>
                    </div>
                    <div>
                        <Avatar src={notification?.account?.avatar} />
                    </div>
                </Flex>
                <div>
                    <Typography.Text className="notification-title">{notification?.title}</Typography.Text>
                </div>
                <div>
                    <Typography.Text>
                        {notification?.message} -{' '}
                        {notification?.createdDate ? dayjs(notification?.createdDate).format('DD/MM/YYYY') : ''}
                    </Typography.Text>
                </div>
            </Flex>
        </Card>
    );
};

const styles = css(`
    border-radius: 0;

    .notification-title {
        font-weight: 600;
        font-size: 16px;
    }

`);
export default NotificationItem;
