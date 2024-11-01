import { useCommentByPost } from '@/hooks/query/comment/use-comment-by-post';
import { CommentCreatePayload, TComment } from '@/types/comment/comment';
import { Comment } from '@ant-design/compatible';
import { Button, Dropdown, Flex, Form, Input, InputRef, List, Modal, Tooltip } from 'antd';
import AvatarPlaceholder from '/public/avatar-placeholder.svg';
import { CloseOutlined, DeleteOutlined, EditOutlined, EllipsisOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { RootState } from '@/stores';
import { useDeleteComment } from '@/hooks/mutate/comment/use-delete-comment';
import { useMessage } from '@/hooks/use-message';
import { useQueryClient } from '@tanstack/react-query';
import { commentKeys } from '@/consts/factory/comment';
import { useRef, useState } from 'react';
import { useOnClickOutside } from 'usehooks-ts';
import { useUpdateComment } from '@/hooks/mutate/comment/use-update-comment';

const { confirm } = Modal;

interface PostCommentListProps {
    postId: string;
    isShown: boolean;
}

const PostCommentList = ({ postId, isShown }: PostCommentListProps) => {
    const inputRef = useRef<any>(null);
    const [form] = Form.useForm();

    const [commentId, setCommentId] = useState<string | null>(null);
    const [isEdit, setIsEdit] = useState(false);

    const { accountInfo } = useSelector((state: RootState) => state.account);

    const { success } = useMessage();
    const queryClient = useQueryClient();

    const { data: comments } = useCommentByPost(postId, isShown);
    const { mutate: deleteComment } = useDeleteComment();
    const { mutate: updateComment } = useUpdateComment();

    if (!comments) {
        return null;
    }

    const isAllowShowActions = (comment: TComment) => {
        return (
            accountInfo?.role?.name === 'ADMIN' ||
            accountInfo?.role?.name === 'STAFF' ||
            comment?.account?.accountId === accountInfo?.accountId
        );
    };

    const handleDelete = (comment: TComment) => {
        confirm({
            title: 'Are you sure you want to delete this comment?',
            onOk() {
                deleteComment(comment?.commentId, {
                    onSuccess: () => {
                        success('Delete comment successfully');
                        queryClient.invalidateQueries({
                            queryKey: commentKeys.byPost(postId),
                        });
                    },
                });
            },
        });
    };

    const handleUpdate = (id: string) => {
        setIsEdit(true);
        setCommentId(id);
    };

    const handleClickOutside = () => {
        setIsEdit(false);
    };

    const onFinish = (values: CommentCreatePayload) => {
        updateComment({
            content: values.content,
            id: commentId as string,
        }, {
          onSuccess: () => {
            setIsEdit(false);
            queryClient.invalidateQueries({
              queryKey: commentKeys.byPost(postId),
            })
          }
        });
    };

    return (
        <List
            className="comment-list"
            header={`${comments?.length} replies`}
            itemLayout="horizontal"
            dataSource={comments}
            rowKey={item => item?.commentId}
            renderItem={(item: TComment) => (
                <li
                    style={{
                        position: 'relative',
                    }}
                >
                    <Comment
                        actions={[<Button type="text">Reply</Button>]}
                        author={item?.account?.username}
                        avatar={item?.account?.avatar || AvatarPlaceholder}
                        content={
                            <>
                                {isEdit ? (
                                    <Flex align="center" gap={8}>
                                        <Form<CommentCreatePayload>
                                            form={form}
                                            initialValues={{ content: item?.content }}
                                            style={{
                                                width: '100%',
                                            }}
                                            onFinish={onFinish}
                                        >
                                            <Form.Item<CommentCreatePayload>
                                                name="content"
                                                style={{
                                                    marginBottom: 0,
                                                }}
                                            >
                                                <Input size="large" ref={inputRef} />
                                            </Form.Item>
                                        </Form>
                                        <Button
                                            size="small"
                                            htmlType="button"
                                            icon={<CloseOutlined />}
                                            onClick={handleClickOutside}
                                        />
                                    </Flex>
                                ) : (
                                    item?.content
                                )}
                            </>
                        }
                    />

                    {isAllowShowActions(item) && (
                        <Dropdown
                            menu={{
                                items: [
                                    {
                                        key: '0',
                                        icon: <EditOutlined />,
                                        label: <span>Edit comment</span>,
                                        onClick: () => handleUpdate(item.commentId),
                                    },
                                    {
                                        key: '1',
                                        icon: <DeleteOutlined />,
                                        label: <span>Delete comment</span>,
                                        onClick: () => handleDelete(item),
                                    },
                                ],
                            }}
                        >
                            <Button
                                style={{
                                    position: 'absolute',
                                    top: 4,
                                    right: 0,
                                }}
                                type="text"
                                icon={<EllipsisOutlined style={{ fontSize: 20 }} />}
                            />
                        </Dropdown>
                    )}
                </li>
            )}
        />
    );
};

export default PostCommentList;
