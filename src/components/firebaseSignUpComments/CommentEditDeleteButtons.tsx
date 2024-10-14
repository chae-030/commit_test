import { IsEditingCommentProps } from "./IsEditingComment";

const CommentEditDeleteButtons: React.FC<IsEditingCommentProps> = (
  props: IsEditingCommentProps
) => {
  const {
    commentId,
    userId,
    handleEditComment,
    handleDeleteComment,
    commentText,
  } = props;
  return userId === props.commentUserId || 'anonymous' === props.commentUserId ? (
    <div className="flex gap-2">
      <button className="text-xs rounded-lg h-6 px-5 py-1 border bg-gray-200" onClick={() => handleEditComment(commentId, commentText)}>
        수정
      </button>
      <button className="text-xs rounded-lg h-6 px-5 py-1 border bg-gray-200" onClick={() => handleDeleteComment(commentId)}>삭제</button>
    </div>
  ) : null;
};

export default CommentEditDeleteButtons;
