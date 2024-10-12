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
    sectionIds,
    activeSection,
  } = props;
  return (
    <div>
      <p>
        <strong>{commentNickname}</strong>: {commentText}
      </p>
      <p>
        {commentCreatedAt &&
          new Date(commentCreatedAt.seconds * 1000).toLocaleString()}
      </p>
      <CommentEditDeleteButtons {...props} />
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault(); // 기본 링크 동작 방지
          toggleRepliesVisibility(commentId); // 답글 보이기 상태 토글
        }}
      >
        {visibleReplies[commentId] ? "답글 숨기기" : `답글 ${replies.length}개`}
      </a>
      {visibleReplies[commentId] && (
        <Reply sectionId={sectionIds[activeSection]} {...props} />
      )}
      <hr />
    </div>
  );
};

export default NoEditingComment;
