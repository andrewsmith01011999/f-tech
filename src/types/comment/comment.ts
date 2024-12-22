import { Account } from '../account';

export type CommentCreatePayload = {
    content: string;
    postId: string;
};

export type TComment = {
    commentId: string;
    content: string;
    account: Account;
    replies: TComment[];
    createdDate: string;
    updatedDate: string;
};

export type UpdateCommentPayload = {
    content: string
}

export type CreateReplyPayload = {
    content: string;
    parentCommentId: string;
    postId: string;
}

export type TReply = {}