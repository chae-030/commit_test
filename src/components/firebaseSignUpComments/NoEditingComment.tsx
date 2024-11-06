import CommentEditDeleteButtons from "./CommentEditDeleteButtons";
import Reply from "./Reply";
import { IsEditingCommentProps } from "./IsEditingComment";
const NoEditingComment = (props: IsEditingCommentProps) => {
  const {
    commentId,
    commentNickname,
    commentText,
    commentCreatedAt,
    toggleRepliesVisibility,
    visibleReplies,
    replies,
    isReply,
    commentsLength,
    index,
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
        <div className="flex justify-between items-center mb-2">
          <p>{commentNickname}</p>
          <CommentEditDeleteButtons {...props} />
        </div>
        <p className="text-black text-base">{commentText}</p>
      </div>
      <p className="text-xs font-normal">
        {commentCreatedAt &&
          new Date(commentCreatedAt.seconds * 1000).toLocaleString()}
      </p>
      {!isReply && (
        <button
          className="text-sm text-blue-600"
          onClick={(e) => {
            e.preventDefault(); // 기본 링크 동작 방지
            toggleRepliesVisibility(commentId); // 답글 보이기 상태 토글
          }}
        >
          {visibleReplies[commentId]
            ? "답글 숨기기"
            : `답글 ${replies.length}개`}
        </button>
      )}
      {visibleReplies[commentId] && <Reply {...props} />}
    </div>
  );
};

export default NoEditingComment;
