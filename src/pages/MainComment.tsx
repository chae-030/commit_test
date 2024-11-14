import { useEffect } from "react";
import { auth } from "../api/firebaseConfig";
import { Timestamp } from "firebase/firestore";
import CommentInput from "../components/firebaseSignUpComments/CommentInput";
import CommentsTopSection from "../components/firebaseSignUpComments/CommentsTopSection";
import CommentsBottomSection from "../components/firebaseSignUpComments/CommentsBottomSection";
import IsLogIn from "../components/firebaseSignUpComments/IsLogIn";
import { useFetch } from "../components/firebaseSignUpComments/functions/commentsFetch";
import { useHandlers } from "../components/firebaseSignUpComments/functions/commentsHandlers";
import { useSections } from "../components/firebaseSignUpComments/functions/commnetsSections";

export interface CommentInterface {
  id: string;
  text: string;
  userId: string;
  nickname: string;
  createdAt: Timestamp;
  parentId?: string;
}

const MainComment = () => {
  const {
    comments,
    editingCommentId,
    setEditingCommentId,
    newCommentText,
    setNewCommentText,
    visibleReplies,
    sectionIds,
    fetchAllComments,
  } = useFetch();
  const {
    handleEditComment,
    handleUpdateComment,
    handleDeleteComment,
    toggleRepliesVisibility,
  } = useHandlers();
  const { activeSection, handleSectionChange, imageName } = useSections();
  const userId = auth.currentUser?.uid;

  useEffect(() => {
    fetchAllComments();
  }, [fetchAllComments]);

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
