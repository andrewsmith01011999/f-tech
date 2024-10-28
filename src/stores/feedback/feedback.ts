export type FeedbackStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export type Feedback = {
    feedbackId: string;
    title: string;
    content: string;
    status: FeedbackStatus;
    createdDate: string;
}

export type CreateFeedbackPayload = {
    title: string;
    content: string;
};
