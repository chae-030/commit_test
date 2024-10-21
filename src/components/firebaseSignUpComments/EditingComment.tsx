import Button from "../mainComponent/Button";
import { IsEditingCommentProps } from "./IsEditingComment";
const EditingComment = (props: IsEditingCommentProps) => {
  const {
    commentNickname,
    commentId,
    newCommentText,
    commentCreatedAt,
    commentsLength,
    index,
    setNewCommentText,
    handleUpdateComment,
    setEditingCommentId,
  } = props;
  return (
    <div
      className="flex flex-col gap-3 pb-3"
      style={{
        borderBottom: commentsLength - 1 === index ? "none" : "1px solid #eee",
        paddingTop: index === 0 ? "none" : "12px",
      }}
    >
      <div>
        <p className="text-md">{commentNickname}</p>
        <div className="flex gap-2 text-sm w-full">
          <input
            className="text-xs rounded-lg h-8 py-2 px-5 border w-8/12"
            value={newCommentText}
            onChange={(e) => setNewCommentText(e.target.value)}
          />
          <Button
            backgroundColor="bg-brand"
            text="완료"
            textColor="text-white"
            onClick={() => handleUpdateComment(commentId)}
            otherStyle="text-xs py-2 px-2 w-2/12 mt-0"
          />
          <Button
            backgroundColor="bg-white"
            text="취소"
            textColor="bg-brand"
            border="border"
            onClick={() => setEditingCommentId(null)}
            otherStyle="text-xs py-2 px-2 w-2/12 mt-0"
          />
        </div>
      </div>
      <p className="text-xs">
        {new Date(commentCreatedAt.seconds * 1000).toLocaleString()}
      </p>
    </div>
  );
};
export default EditingComment;
