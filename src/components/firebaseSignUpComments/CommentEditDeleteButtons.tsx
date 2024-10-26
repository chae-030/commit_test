import Button from "../common/Button";
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
  return userId === props.commentUserId ||
    "anonymous" === props.commentUserId ? (
    <div className="flex gap-2">
      <Button
        backgroundColor="bg-white"
        text="수정"
        textColor="bg-brand"
        border="border"
        onClick={() => handleEditComment(commentId, commentText)}
        otherStyle="text-xs px-5 py-1 mt-0"
      />
      <Button
        backgroundColor="bg-white"
        text="삭제"
        textColor="bg-brand"
        border="border"
        onClick={() => handleDeleteComment(commentId)}
        otherStyle="text-xs px-5 py-1 mt-0"
      />
    </div>
  ) : null;
};

export default CommentEditDeleteButtons;
