import { useEffect, useMemo, useState, useCallback } from "react";
import { auth, db } from "../api/firebaseConfig";
import {
  collection,
  query,
  where,
  doc,
  updateDoc,
  deleteDoc,
  Timestamp,
  getDocs,
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
  parentId?: string;
}

const MainComment = () => {
  const [comments, setComments] = useState<Record<string, Comment[]>>({});
  const [activeSection, setActiveSection] = useState(0);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [newCommentText, setNewCommentText] = useState<string>("");
  const [visibleReplies, setVisibleReplies] = useState<Record<string, boolean>>(
    {}
  );
  const { sectionId } = useParams<{ sectionId: string }>();
  const userId = auth.currentUser?.uid;
  const navigate = useNavigate();

  const sectionIds = useMemo(
    () => [
      "Front-end 개발자",
      "Back-end 개발자",
      "UI/UX 디자이너",
      "프로덕트 매니저",
      "프로젝트 매니저",
      "QA 엔지니어",
      "데브옵스 엔지니어",
    ],
    []
  );

  const fetchAllComments = useCallback(async () => {
    const allComments: Record<string, Comment[]> = {};
    for (const sectionId of sectionIds) {
      const q = query(
        collection(db, "comments"),
        where("postId", "==", sectionId)
      );
      const querySnapshot = await getDocs(q);
      allComments[sectionId] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Comment[];
    }
    setComments(allComments);
  }, [sectionIds]);

  useEffect(() => {
    fetchAllComments();
  }, [fetchAllComments]);

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

  const handleEditComment = async (commentId: string, currentText: string) => {
    setEditingCommentId(commentId);
    setNewCommentText(currentText);
  };

  const handleUpdateComment = async (commentId: string) => {
    try {
      const commentDocRef = doc(db, "comments", commentId);
      await updateDoc(commentDocRef, {
        text: newCommentText,
      });
      alert(`댓글을 수정하였습니다.`);
      setEditingCommentId(null);
      fetchAllComments();
    } catch (error) {
      console.error("댓글 수정 실패:", error);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      const commentDocRef = doc(db, "comments", commentId);
      await deleteDoc(commentDocRef);
      alert(`댓글을 삭제하였습니다.`);
      fetchAllComments();
    } catch (error) {
      console.error("댓글 삭제 실패:", error);
    }
  };

  const toggleRepliesVisibility = (commentId: string) => {
    setVisibleReplies((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
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
    <div className="flex flex-col gap-8 my-8">
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
