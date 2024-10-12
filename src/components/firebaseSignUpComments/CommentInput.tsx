import React, { useState } from "react";
import { auth, db } from "../../constants/firebaseConfig"; // Firebase 설정 가져오기
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
interface CommentInputProps {
  postId: string; // postId의 타입 지정
  parentId?: string; // 대댓글을 위한 parentId 추가
}

const CommentInput: React.FC<CommentInputProps> = ({ postId, parentId }) => {
  const [comment, setComment] = useState<string>(""); // comment의 타입 지정

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!comment.trim()) return; // 빈 댓글은 등록되지 않도록
    let nickname = "익명"; // 기본값으로 '익명' 설정
    let userId = "anonymous"; // 로그인하지 않은 경우 'guest'로 userId 설정

    // 사용자가 로그인한 경우 닉네임과 userId를 설정
    if (auth.currentUser) {
      userId = auth.currentUser.uid;
      // Firestore에서 사용자 정보 가져오기
      const userDocRef = doc(db, "users", userId);
      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        nickname = userData.nickname || "익명"; // Firestore에 닉네임이 있으면 사용
      }
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
      parentId
        ? alert("답글을 작성하였습니다.")
        : alert("댓글을 작성하였습니다.");
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
        placeholder={parentId ? "답글을 입력하세요." : "댓글을 입력하세요."}
        required
      />
      <button type="submit">{parentId ? "답글 작성" : "댓글 작성"}</button>
    </form>
  );
};

export default CommentInput;
