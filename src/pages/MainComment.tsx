import { useEffect, useMemo, useState } from "react";
import { auth, db } from "../api/firebaseConfig"; // Firebase 설정 가져오기
import {
  collection,
  query,
  where,
  doc,
  updateDoc,
  deleteDoc,
  Timestamp,
  getDocs
} from "firebase/firestore";
import CommentInput from "../components/firebaseSignUpComments/CommentInput";
import front from "../images/front.jpg";
import back from "../images/back.jpg";
import uiux from "../images/uiux.jpg";
import product from "../images/product.jpg";
import project from "../images/project.jpg";
import qa from "../images/qa.jpg";
import devops from "../images/devops.jpg";
import CommentsTopSection from "../components/firebaseSignUpComments/CommentsTopSection";
import CommentsBottomSection from "../components/firebaseSignUpComments/CommentsBottomSection";
import IsLogIn from "../components/firebaseSignUpComments/IsLogIn";
import { useNavigate, useParams } from "react-router-dom";

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
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null); // 수정 중인 댓글 ID
  const [newCommentText, setNewCommentText] = useState<string>(""); // 수정할 댓글 내용
  const [visibleReplies, setVisibleReplies] = useState<Record<string, boolean>>(
    {}
  ); // 각 댓글의 대댓글 보이기 상태
  const { sectionId } = useParams<{ sectionId: string }>();
  const userId = auth.currentUser?.uid; //useState로 변경
  const navigate = useNavigate();
  const sectionIds = useMemo(() => [
    "Front-end 개발자",
    "Back-end 개발자",
    "UI/UX 디자이너",
    "프로덕트 매니저",
    "프로젝트 매니저",
    "QA 엔지니어",
    "데브옵스 엔지니어",
  ], []); // 여러 섹션 ID useMemo로 변경
  // 모든 섹션의 댓글을 한 번에 불러와서 상태에 저장
  /* 실시간 리스너 onSnapshot 설정 제거, 
  이거 때문에 읽기 사용량 증가해서 
  파이어베이스 일일한도 메모리 초과해서 연결 끊긴걸 수도.. */
  const fetchAllComments = async () => {
    const allComments: Record<string, Comment[]> = {};
    for (const sectionId of sectionIds) {
      const q = query(collection(db, "comments"), where("postId", "==", sectionId));
      const querySnapshot = await getDocs(q);
      allComments[sectionId] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Comment[];
    }
    setComments(allComments);
  };
  
  // 컴포넌트가 처음 마운트될 때만 호출
  useEffect(() => {
      fetchAllComments();
  }, []); // 빈 배열로 설정하여 마운트 시 한 번만 호출

  useEffect(() => {
    const sectionNameMapping: { [key: string]: number } = {
      frontend: 0,
      backend: 1,
      uiux: 2,
      product: 3,
      project: 4,
      qa: 5,
      devops: 6,
    };
    if (sectionId) {
      const mappedSection = sectionNameMapping[sectionId];
      mappedSection !== undefined
        ? setActiveSection(mappedSection)
        : setActiveSection(0);
    }
  }, [sectionId]);

  // 섹션 변경 핸들러
  const handleSectionChange = (index: number) => {
    setActiveSection(index);
    const sectionNameMapping: { [key: string]: string } = {
      "Front-end 개발자": "frontend",
      "Back-end 개발자": "backend",
      "UI/UX 디자이너": "uiux",
      "프로덕트 매니저": "product",
      "프로젝트 매니저": "project",
      "QA 엔지니어": "qa",
      "데브옵스 엔지니어": "devops",
    };
    const newSectionId = sectionNameMapping[sectionIds[index]];
    navigate(`/comments/${newSectionId}`);
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
    <div className="flex flex-col gap-8">
      <IsLogIn />
      <CommentsTopSection
        activeSection={activeSection}
        handleSectionChange={handleSectionChange}
        imageName={imageName}
        sectionIds={sectionIds}
      />
      <CommentInput postId={sectionIds[activeSection]} />
      <CommentsBottomSection
        activeSection={activeSection}
        comments={comments}
        editingCommentId={editingCommentId}
        handleDeleteComment={handleDeleteComment}
        handleEditComment={handleEditComment}
        handleUpdateComment={handleUpdateComment}
        newCommentText={newCommentText}
        sectionIds={sectionIds}
        setEditingCommentId={setEditingCommentId}
        setNewCommentText={setNewCommentText}
        toggleRepliesVisibility={toggleRepliesVisibility}
        userId={userId}
        visibleReplies={visibleReplies}
      />
    </div>
  );
};

export default MainComment;
