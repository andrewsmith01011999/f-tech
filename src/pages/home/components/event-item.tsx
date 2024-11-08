import { Flex, Tag, Typography } from 'antd';
import LocationSvg from '/public/location.svg';
import { Event } from '@/types/event';
import dayjsConfig from '@/utils/dayjs';

interface EventItemProps {
    event: Event;
}

export const EventItem = ({ event }: EventItemProps) => {
    return (
        <Flex gap={16} className="event-item">
            <Flex vertical justify="space-between" align="center" className="event-date-wrapper">
                <Typography.Title level={5} style={{ textTransform: 'uppercase' }}>
                    {dayjsConfig(event?.startDate).format('MMM')}
                </Typography.Title>
                <Typography.Title level={2} className="event-date">
                    {dayjsConfig(event?.startDate).format('DD')}
                </Typography.Title>
            </Flex>

            <Flex vertical gap={10} align="center">
                <Typography.Title level={5} style={{ textTransform: 'uppercase' }}>
                    {event?.title}
                </Typography.Title>
                <Flex align="center" gap={6}>
                    <img src={LocationSvg} alt="location" />
                    <Typography.Text
                        style={{
                            fontSize: 10,
                        }}
                        type="secondary"
                    >
                        {event?.location}
                    </Typography.Text>
                </Flex>
            </Flex>
        </Flex>
    );
};
