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
        paddingTop: index === 0 ? 'none':"12px"
      }}
    >
      <div>
        <p>{commentNickname}</p>
        <p className="text-black text-xl">{commentText}</p>
      </div>
      <p className="text-xs">
        {commentCreatedAt &&
          new Date(commentCreatedAt.seconds * 1000).toLocaleString()}
      </p>
      <CommentEditDeleteButtons {...props} />
      {!isReply && (
        <a
          className="text-sm text-blue-600"
          href="#"
          onClick={(e) => {
            e.preventDefault(); // 기본 링크 동작 방지
            toggleRepliesVisibility(commentId); // 답글 보이기 상태 토글
          }}
        >
          {visibleReplies[commentId]
            ? "답글 숨기기"
            : `답글 ${replies.length}개`}
        </a>
      )}
      {visibleReplies[commentId] && <Reply {...props} />}
    </div>
  );
};

export default NoEditingComment;
