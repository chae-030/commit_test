import { useEffect, useState } from "react";
import { auth, db } from "./firebaseConfig"; // Firebase 설정 가져오기
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  Timestamp,
} from "firebase/firestore";
import Comments from "./commentsComponents/Comments";
import CommentInput from "./commentsComponents/CommentInput";
import IsEditingComment from "./commentsComponents/IsEditingComment";

export interface Comment {
  id: string;
  text: string;
  userId: string;
  nickname: string;
  createdAt: Timestamp;
  parentId?: string; // 대댓글의 부모 댓글 ID
}

const MainComment = () => {
  const [comments, setComments] = useState<Record<string, Comment[]>>({});
  const [activeSection, setActiveSection] = useState(0); // 현재 활성 섹션 인덱스
  const sectionIds = ["프론트엔드", "백엔드", "section3"]; // 여러 섹션 ID
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null); // 수정 중인 댓글 ID
  const [newCommentText, setNewCommentText] = useState<string>(""); // 수정할 댓글 내용
  const [visibleReplies, setVisibleReplies] = useState<Record<string, boolean>>(
    {}
  ); // 각 댓글의 대댓글 보이기 상태
  const userId = auth.currentUser?.uid;

  useEffect(() => {
    sectionIds.forEach((sectionId) => {
      const q = query(
        collection(db, "comments"),
        where("postId", "==", sectionId)
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const sectionComments: Comment[] = [];
        querySnapshot.forEach((doc) => {
          sectionComments.push({ id: doc.id, ...doc.data() } as Comment);
        });
        setComments((prevComments) => ({
          ...prevComments,
          [sectionId]: sectionComments,
        }));
      });

      return () => unsubscribe();
    });
  }, []);

  // 섹션 변경 핸들러
  const handleSectionChange = (index: number) => {
    setActiveSection(index);
  };

  // 댓글 수정
  const handleEditComment = async (commentId: string, currentText: string) => {
    setEditingCommentId(commentId); // 수정할 댓글 ID 설정
    setNewCommentText(currentText); // 현재 댓글 내용을 수정창에 미리 넣기
  };

  const handleUpdateComment = async (commentId: string) => {
    try {
      const commentDocRef = doc(db, "comments", commentId);
      await updateDoc(commentDocRef, {
        text: newCommentText, // 수정된 댓글 내용
      });
      console.log("댓글 수정 성공:", commentId);
      setEditingCommentId(null); // 수정 완료 후 수정 상태 해제
    } catch (error) {
      console.error("댓글 수정 실패:", error);
    }
  };
  // 댓글 삭제
  const handleDeleteComment = async (commentId: string) => {
    try {
      const commentDocRef = doc(db, "comments", commentId);
      await deleteDoc(commentDocRef);
      console.log("댓글 삭제 성공:", commentId);
    } catch (error) {
      console.error("댓글 삭제 실패:", error);
    }
  };
  // 답글 보이기/숨기기 토글 핸들러
  const toggleRepliesVisibility = (commentId: string) => {
    setVisibleReplies((prev) => ({
      ...prev,
      [commentId]: !prev[commentId], // 해당 댓글의 대댓글 보이기 상태 토글
    }));
  };
  return (
    <div>
      <Comments />
      <h2>{sectionIds[activeSection]} 댓글</h2>
      <div>
        {sectionIds.map((sectionId, index) => (
          <button key={index} onClick={() => handleSectionChange(index)}>
            {sectionId}
          </button>
        ))}
      </div>
      <CommentInput postId={sectionIds[activeSection]} />
      <div>
        {/* parentId가 없는 댓글만 표시 (일반 댓글) */}
        {comments[sectionIds[activeSection]]
          ?.filter((comment) => !comment.parentId) // 대댓글이 아닌 댓글만 표시
          .sort((a, b) => b.createdAt.toMillis() - a.createdAt.toMillis()) // createdAt을 기준으로 최신댓글 위로오게
          .map((comment) => {
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
              />
            );
          })}
      </div>
    </div>
  );
};

export default MainComment;
