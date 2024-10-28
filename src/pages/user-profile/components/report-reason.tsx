import { ReportAccountReasons } from '@/types/report/report';
import { Button, Flex, Form, Radio, Typography } from 'antd';
import React from 'react';

interface ReportReasonProps {
    reason: ReportAccountReasons;
    selectedReason: ReportAccountReasons | undefined;
    setSelectedReason: (value: ReportAccountReasons) => void;
}

const mapReportReasonDescription = (reason: ReportAccountReasons) => {
    switch (reason) {
        case 'HATE_SPEECH':
            return 'Slurs, Racist or sexist stereotypes, Dehumanization, Incitement of fear or discrimination, Hateful references, Hateful symbols & logos';
        case 'HARASSMENT':
            return 'Insults, Unwanted Sexual Content & Graphic Objectification, Unwanted NSFW & Graphic Content, Violent Event Denial, Targeted Harassment and Inciting Harassment';

        default:
            return '';
    }
};

const ReportReason = ({ reason, selectedReason, setSelectedReason }: ReportReasonProps) => {
    return (
        <Flex justify="space-between" align="flex-start">
            <Flex vertical>
                <Typography.Title level={5}>{reason}</Typography.Title>
                <Typography.Paragraph type="secondary">{mapReportReasonDescription(reason)}</Typography.Paragraph>
            </Flex>

            <Radio value={reason} checked={reason === selectedReason} onChange={() => setSelectedReason(reason)} />
        </Flex>
    );
};

export default ReportReason;
