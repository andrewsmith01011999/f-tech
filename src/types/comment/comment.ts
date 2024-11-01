import { Account } from '../account';

export type CommentCreatePayload = {
    content: string;
    postId: string;
};

export type TComment = {
    commentId: string;
    content: string;
    account: Account;
};

export type UpdateCommentPayload = {
    content: string
}
