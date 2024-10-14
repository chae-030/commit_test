import CommentInput from "./CommentInput";
import IsEditingComment, { IsEditingCommentProps } from "./IsEditingComment";

const Reply = (replyProps: IsEditingCommentProps) => {
  const {
    replies,
    commentId,
    sectionIds,
    activeSection,
    commentUserId,
    commentText,
    commentCreatedAt,
    commentNickname,
    visibleReplies,
    isReply,
    commentsLength,
    index,
    ...rest
  } = replyProps;

  // createdAt 기준으로 정렬 (오래된 댓글이 위로)
  const sortedReplies = [...replies].sort(
    (a, b) => a.createdAt.seconds - b.createdAt.seconds
  );

  return (
    <div className="ml-7">
      {/* 대댓글 리스트 */}
      {sortedReplies.map((reply, index, array) => (
        <div key={reply.id}>
          <IsEditingComment
            commentId={reply.id}
            commentUserId={reply.userId} // 명시적으로 전달
            commentText={reply.text}
            commentNickname={reply.nickname}
            commentCreatedAt={reply.createdAt}
            activeSection={activeSection} // 수정: activeSection 제대로 전달
            replies={[]} // 대댓글의 대댓글은 비워둠
            visibleReplies={{}} // 대댓글의 보이는 상태는 비워둠
            sectionIds={sectionIds}
            isReply="yes"
            commentsLength={array.length}
            index={index}
            {...rest} // 중복되지 않은 나머지 props만 전달
          />
        </div>
      ))}
      {replies.length===0&&<p className="text-sm">작성된 답글이 없습니다...</p>}
      {/* 대댓글 추가 입력란 */}
      <div style={{paddingTop:replies.length===0?'0px':'12px'}}>
        <CommentInput postId={sectionIds[activeSection]} parentId={commentId} />
      </div>
    </div>
  );
};

export default Reply;
