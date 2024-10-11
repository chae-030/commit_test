import React, { useState } from "react";
import { auth, db } from "./firebaseConfig"; // Firebase 설정 가져오기
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

interface CommentInputProps {
  postId: string; // postId의 타입 지정
  parentId?: string; // 대댓글을 위한 parentId 추가
}

const CommentInput: React.FC<CommentInputProps> = ({ postId, parentId }) => {
  const [comment, setComment] = useState<string>(""); // comment의 타입 지정
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!comment.trim()) return; // 빈 댓글은 등록되지 않도록
    if (!auth.currentUser) {
      alert("로그인을 해주세요.");
      navigate("/login");
      return;
    }

    const userId = auth.currentUser.uid;
    // Firestore에서 사용자 정보 가져오기
    const userDocRef = doc(db, "users", userId);
    const userDocSnap = await getDoc(userDocRef);
    let nickname = "Anonymous"; // 기본값
    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      nickname = userData.nickname || "Anonymous"; // Firestore에 닉네임이 있으면 사용
    }
    try {
      const commentData: any = {
        text: comment,
        userId,
        nickname,
        postId,
        createdAt: new Date(),
      };
      // parentId가 있을 때만 추가
      if (parentId) {
        commentData.parentId = parentId;
      }
      // Firebase에 댓글 추가
      await addDoc(collection(db, "comments"), commentData);
      setComment(""); // 입력란 비우기
    } catch (error) {
      console.error("댓글 등록 실패:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="댓글을 입력하세요."
        required
      />
      <button type="submit">{parentId ? "답글 작성" : "댓글 작성"}</button>
    </form>
  );
};

export default CommentInput;
