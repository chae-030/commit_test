import { Timestamp } from "firebase/firestore";
import EditingComment from "./EditingComment";
import { Comment } from "../MainComment";
import NoEditingComment from "./NoEditingComment";
export type IsEditingCommentProps = {
  userId: string | undefined;
  commentId: string;
  commentUserId: string;
  commentText: string;
  commentNickname: string;
  editingCommentId: string | null;
  commentCreatedAt: Timestamp;
  setEditingCommentId: (value: React.SetStateAction<string | null>) => void;
  handleUpdateComment: (commentId: string) => Promise<void>;
  setNewCommentText: React.Dispatch<React.SetStateAction<string>>;
  handleDeleteComment: (commentId: string) => Promise<void>;
  handleEditComment: (commentId: string, currentText: string) => Promise<void>;
  toggleRepliesVisibility: (commentId: string) => void;
  newCommentText: string;
  visibleReplies: Record<string, boolean>;
  replies: Comment[];
  sectionIds: string[];
  activeSection: number;
};
const IsEditingComment = (props: IsEditingCommentProps) => {
  const { commentId, editingCommentId } = props;
  return commentId === editingCommentId ? (
    <EditingComment {...props} />
  ) : (
    <NoEditingComment {...props} />
  );
};

export default IsEditingComment;
