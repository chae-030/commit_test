import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useFetch } from "./commentsFetch";
import { db } from "../../../api/firebaseConfig";

export const useHandlers = () => {
  const {
    setEditingCommentId,
    newCommentText,
    setNewCommentText,
    setVisibleReplies,
    fetchAllComments,
  } = useFetch();
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
  return {
    handleEditComment,
    handleUpdateComment,
    handleDeleteComment,
    toggleRepliesVisibility,
  };
};
