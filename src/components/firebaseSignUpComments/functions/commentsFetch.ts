import { useCallback, useMemo, useState } from "react";
import { db } from "../../../api/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import { CommentInterface } from "../../../pages/MainComment";

export const useFetch = () => {
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [newCommentText, setNewCommentText] = useState<string>("");
  const [comments, setComments] = useState<Record<string, CommentInterface[]>>(
    {}
  );
  const [visibleReplies, setVisibleReplies] = useState<Record<string, boolean>>(
    {}
  );

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
    const allComments: Record<string, CommentInterface[]> = {};
    for (const sectionId of sectionIds) {
      const q = query(
        collection(db, "comments"),
        where("postId", "==", sectionId)
      );
      const querySnapshot = await getDocs(q);
      allComments[sectionId] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as CommentInterface[];
    }
    setComments(allComments);
  }, [sectionIds]);
  return {
    comments,
    editingCommentId,
    setEditingCommentId,
    newCommentText,
    setNewCommentText,
    visibleReplies,
    setVisibleReplies,
    sectionIds,
    fetchAllComments,
  };
};
