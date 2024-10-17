import { Topic } from '../topic/topic';

export enum PostStatus {
    PUBLIC = 'PUBLIC',
    PRIVATE = 'PRIVATE',
    DELETED = 'DELETED',
}

export type Post = {
    postId: string;
    title: string;
    content: string;
    status: PostStatus;
    topic: Topic;
};

export type CreatePostPayload = {
    title: string;
    content: string;
    topicId: string;
    tagId: string;
    imageUrlList: { url: string }[];
};
