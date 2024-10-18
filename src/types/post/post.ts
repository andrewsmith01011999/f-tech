import { ImageResponse } from '..';
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
    createdDate: string;
    lastModifiedDate: string;
    imageUrlList?: ImageResponse[];
};

export type CreatePostPayload = {
    title: string;
    content: string;
    topicId: string;
    tagId: string;
    imageUrlList: { url: string }[];
};

export type UpdatePostPayload = {
    title: string;
    content: string;
    imageUrlList: { url: string }[];
}
