import { IsEditingCommentProps } from "./IsEditingComment";
const EditingComment = (props: IsEditingCommentProps) => {
  const {
    commentId,
    newCommentText,
    setNewCommentText,
    handleUpdateComment,
    setEditingCommentId,
  } = props;
  return (
    <div>
      <textarea
        value={newCommentText}
        onChange={(e) => setNewCommentText(e.target.value)}
      />
      <button onClick={() => handleUpdateComment(commentId)}>수정 완료</button>
      <button onClick={() => setEditingCommentId(null)}>취소</button>
    </div>
  );
};
export default EditingComment;
