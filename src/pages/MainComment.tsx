import { useEffect, useState } from "react";
import { auth, db } from "../api/firebaseConfig"; // Firebase 설정 가져오기
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
import Comments from "../components/firebaseSignUpComments/Comments";
import CommentInput from "../components/firebaseSignUpComments/CommentInput";
import IsEditingComment from "../components/firebaseSignUpComments/IsEditingComment";
import front from "../images/front.jpg";
import back from "../images/back.jpg";
import uiux from "../images/uiux.jpg";
import product from "../images/product.jpg";
import project from "../images/project.jpg";
import qa from "../images/qa.jpg";
import devops from "../images/devops.jpg";

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
  const sectionIds = [
    "Front-end 개발자",
    "Back-end 개발자",
    "UI/UX 디자이너",
    "프로덕트 매니저",
    "프로젝트 매니저",
    "QA 엔지니어",
    "데브옵스 엔지니어",
  ]; // 여러 섹션 ID
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
    console.log("Editing comment ID:", commentId); // 현재 수정하려는 댓글 ID
    console.log("Current text:", currentText); // 현재 댓글 내용
    setEditingCommentId(commentId); // 수정할 댓글 ID 설정
    setNewCommentText(currentText); // 현재 댓글 내용을 수정창에 미리 넣기
  };

  const handleUpdateComment = async (commentId: string) => {
    try {
      const commentDocRef = doc(db, "comments", commentId);
      await updateDoc(commentDocRef, {
        text: newCommentText, // 수정된 댓글 내용
      });
      alert(`댓글을 수정하였습니다.`);
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
      alert(`댓글을 삭제하였습니다.`);
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
  const imageName = (sectionName: string) => {
    const imageMap: { [key: string]: string } = {
      "Front-end 개발자": front,
      "Back-end 개발자": back,
      "UI/UX 디자이너": uiux,
      "프로덕트 매니저": product,
      "프로젝트 매니저": project,
      "QA 엔지니어": qa,
    };
    return imageMap[sectionName] || devops;
  };

  return (
    <div className="flex flex-col gap-8 items-center">
      <Comments />
      <div className="flex gap-2 flex-wrap">
        {sectionIds.map((sectionId, index) => (
          <button
            className="text-xs border rounded-lg p-2 w-32"
            key={index}
            onClick={() => handleSectionChange(index)}
          >
            {sectionId}
          </button>
        ))}
      </div>
      <div className="text-center">
        <p className="mb-2">무슨 이야기를 나누고 있나요?</p>
        <h2 className="text-3xl font-bold" style={{ color: "#FFC801" }}>
          {sectionIds[activeSection]}
        </h2>
      </div>
      <div className="w-full">
        <img
          src={imageName(sectionIds[activeSection])}
          className="w-full h-full object-cover"
          alt={sectionIds[activeSection]}
        />
      </div>
      <CommentInput postId={sectionIds[activeSection]} />
      <div className="w-full">
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
