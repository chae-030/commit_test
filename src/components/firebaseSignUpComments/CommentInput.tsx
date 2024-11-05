import React, { useState } from "react";
import { auth, db } from "../../api/firebaseConfig"; // Firebase 설정 가져오기
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import Button from "../mainComponent/Button";
import { useNavigate } from "react-router-dom";
interface CommentInputProps {
  postId: string; // postId의 타입 지정
  parentId?: string; // 대댓글을 위한 parentId 추가
}

const CommentInput: React.FC<CommentInputProps> = ({ postId, parentId }) => {
  const [comment, setComment] = useState<string>(""); // comment의 타입 지정
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!comment.trim()) return; // 빈 댓글은 등록되지 않도록

    // 사용자가 로그인한 경우 닉네임과 userId를 설정
    if (auth.currentUser) {
      let userId = auth.currentUser.uid;
      let nickname = "방문자"; // 기본값으로 '방문자' 설정
      // Firestore에서 사용자 정보 가져오기
      const userDocRef = doc(db, "users", userId);
      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        nickname = userData.nickname
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
        window.location.reload()
      } catch (error) {
        console.error("댓글 등록 실패:", error);
      }
    } else {
      alert("로그인을 해야 댓글을 작성할 수 있습니다.");
      setComment("");
      navigate('/comments/login');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 text-sm w-full">
      <input
        className="text-xs rounded-lg h-8 py-2 px-5 border w-10/12"
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder={parentId ? "답글을 입력하세요." : "댓글을 입력하세요."}
        required
      />
      <Button
        otherStyle="text-xs rounded-lg h-8 py-2 px-0 w-3/12 mt-0"
        backgroundColor="bg-brand"
        text={parentId ? "답글 작성" : "댓글 작성"}
        textColor="text-white"
        border="border-white"
        type="submit"
      />
    </form>
  );
};

export default CommentInput;
