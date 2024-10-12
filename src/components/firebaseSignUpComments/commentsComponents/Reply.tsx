import CommentInput from "./CommentInput";
import { Comment } from "../MainComment";
type ReplyProps = {
  sectionId: string; // 섹션 ID
  commentId: string; // 부모 댓글 ID
  replies: Comment[]; // 대댓글 리스트
  userId: string | undefined; // 현재 사용자 ID
  handleEditComment: (commentId: string, currentText: string) => Promise<void>; // 댓글 수정 핸들러
  handleDeleteComment: (commentId: string) => Promise<void>; // 댓글 삭제 핸들러
};//이거는IsEditingCommentProps로 받아오면 왜인지 답글로 등록안돼서 그냥 이렇게함
const Reply = ({
  sectionId,
  commentId,
  replies,
  userId,
  handleEditComment,
  handleDeleteComment,
}: ReplyProps) => {
  const sortedReplies = [...replies].sort(
    (a, b) => a.createdAt.seconds - b.createdAt.seconds
  ); // createdAt 기준으로 정렬 (오래된 댓글이 위로)
  return (
    <div style={{ marginLeft: "20px" }}>
      <CommentInput postId={sectionId} parentId={commentId} />
      {sortedReplies.map((reply) => (
        <div key={reply.id}>
          <p>
            <strong>{reply.nickname}</strong>: {reply.text}
          </p>
          <p>
            {reply.createdAt &&
              new Date(reply.createdAt.seconds * 1000).toLocaleString()}
          </p>
          {reply.userId === userId ? (
            <div>
              <button onClick={() => handleEditComment(reply.id, reply.text)}>
                수정
              </button>
              <button onClick={() => handleDeleteComment(reply.id)}>
                삭제
              </button>
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default Reply;
