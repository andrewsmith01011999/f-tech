import { useFeedbackListing } from '@/hooks/query/feedback/use-feedback-listing';
import { Empty } from 'antd';
import React from 'react';
import AdminFeedbackWrapper from '../../feedback/layout/admin-feedback-wrapper';
import AdminFeedbackItem from '../../feedback/components/admin-feedback-item';
import { useReportPostsListing } from '@/hooks/query/report/use-report-posts';
import AdminReportItem from './admin-report-item';

const AdminReportList = () => {
    const { data: reportPosts } = useReportPostsListing();

    if (!reportPosts || !reportPosts.length) {
        return <Empty />;
    }

    return (
        <AdminFeedbackWrapper>
            {reportPosts.map(reportPost => (
                <AdminReportItem key={reportPost.reportId} data={reportPost} />
            ))}
        </AdminFeedbackWrapper>
    );
};

export default AdminReportList;
