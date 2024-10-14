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
    <div className="flex flex-col gap-3 pb-3"style={{
      borderBottom: commentsLength - 1 === index ? "none" : "1px solid #eee",
      paddingTop: index === 0 ? 'none':"12px"
    }}>
      <div>
        <p className="text-md">{commentNickname}</p>
        <div className="flex gap-2 text-sm w-full">
          <input
            className="shadow text-xs rounded-lg h-8 py-2 px-5 border w-8/12"
            value={newCommentText}
            onChange={(e) => setNewCommentText(e.target.value)}
          />
          <button
            className="[text-shadow:_1px_1px_1px_rgb(0_0_0_/_40%)] shadow text-xs rounded-lg h-8 py-2 text-white w-2/12"
            onClick={() => handleUpdateComment(commentId)}
            style={{ background: "#FFC801", border: "solid #fff 1px" }}
          >
            완료
          </button>
          <button
            className="[text-shadow:_1px_1px_1px_rgb(0_0_0_/_40%)] shadow text-xs rounded-lg h-8 py-2 bg-gray-200 text-white w-2/12"
            onClick={() => setEditingCommentId(null)}
            style={{ background: "#bbb", border: "solid #fff 1px" }}
          >
            취소
          </button>
        </div>
      </div>
      <p className="text-xs">{new Date(commentCreatedAt.seconds * 1000).toLocaleString()}</p>
    </div>
  );
};
export default EditingComment;
