import { Card, Flex } from 'antd';
import ArrowRightSvg from '/public/arrow-right.svg';
import { EventsWrapper } from '../layout/events-wrapper';
import { EventItem } from './event-item';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '@/utils/paths';

export const EventList = () => {
    const navigate = useNavigate();

    return (
        <Card
            title={
                <Flex align="center" gap={4} onClick={() => navigate(PATHS.EVENTS)} style={{
                    cursor: 'pointer'
                }}>
                    Events
                    <img src={ArrowRightSvg} />
                </Flex>
            }
            style={{
                width: 326,
                height: 'fit-content',
            }}
            className="card-menu card-events"
        >
          <EventsWrapper>
            <EventItem />
            <EventItem />
            <EventItem />
            <EventItem />
          </EventsWrapper>
        </Card>
    );
};
