import { Comment } from "../../pages/MainComment";
import IsEditingComment from "./IsEditingComment";

type CommentsBottomSectionProps = {
  comments: Record<string, Comment[]>;
  sectionIds: string[];
  activeSection: number;
  editingCommentId: string | null;
  newCommentText: string;
  userId: string | undefined;
  visibleReplies: Record<string, boolean>;
  handleUpdateComment: (commentId: string) => Promise<void>;
  handleEditComment: (commentId: string, currentText: string) => Promise<void>;
  handleDeleteComment: (commentId: string) => Promise<void>;
  setNewCommentText: React.Dispatch<React.SetStateAction<string>>;
  setEditingCommentId: React.Dispatch<React.SetStateAction<string | null>>;
  toggleRepliesVisibility: (commentId: string) => void;
};

const CommentsBottomSection = ({
  activeSection,
  comments,
  editingCommentId,
  handleDeleteComment,
  handleEditComment,
  handleUpdateComment,
  newCommentText,
  sectionIds,
  setEditingCommentId,
  setNewCommentText,
  toggleRepliesVisibility,
  userId,
  visibleReplies,
}: CommentsBottomSectionProps) => {
  return (
    <div className="w-full min-h-svh">
      {/* 현재 섹션의 댓글이 없으면 "이야기 없음" 출력 */}
      {comments[sectionIds[activeSection]]?.length === 0 ? (
        <p className="text-center">이야기 없음...</p>
      ) : (
        /* parentId가 없는 댓글만 표시 (일반 댓글) */
        comments[sectionIds[activeSection]]
          ?.filter((comment) => !comment.parentId) // 대댓글이 아닌 댓글만 표시
          .sort((a, b) => b.createdAt.toMillis() - a.createdAt.toMillis()) // createdAt을 기준으로 최신 댓글을 위로 정렬
          .map((comment, index, array) => {
            const replies = comments[sectionIds[activeSection]].filter(
              (reply) => reply.parentId === comment.id
            ); // 해당 댓글에 대한 답글들만 필터
            return (
              <IsEditingComment
                key={comment.id}
                activeSection={activeSection}
                commentCreatedAt={comment.createdAt}
                commentId={comment.id}
                commentNickname={comment.nickname}
                commentText={comment.text}
                commentUserId={comment.userId}
                editingCommentId={editingCommentId}
                handleDeleteComment={handleDeleteComment}
                handleEditComment={handleEditComment}
                handleUpdateComment={handleUpdateComment}
                newCommentText={newCommentText}
                replies={replies}
                sectionIds={sectionIds}
                setEditingCommentId={setEditingCommentId}
                setNewCommentText={setNewCommentText}
                toggleRepliesVisibility={toggleRepliesVisibility}
                userId={userId}
                visibleReplies={visibleReplies}
                commentsLength={array.length}
                index={index}
              />
            );
          })
      )}
    </div>
  );
};

export default CommentsBottomSection;
