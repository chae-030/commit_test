import { useState, useEffect } from "react";
import { auth, db } from "../../api/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

const Comments = () => {
  const [nickname, setNickname] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));

        if (userDoc.exists()) {
          setNickname(userDoc.data()?.nickname || "Anonymous");
        }
      } else {
        setNickname(null); // 로그아웃 시 닉네임 초기화
      }
    });

    return () => unsubscribe(); // 컴포넌트 언마운트 시 리스너 해제
  }, []);

  // 로그아웃 핸들러
  const handleLogout = async () => {
    try {
      await signOut(auth); // Firebase에서 로그아웃
      console.log("로그아웃 성공");
      navigate("/maincomment"); // 로그아웃 후 메인 페이지로 이동
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  useEffect(() => {
    const fetchUserNickname = async () => {
      const user = auth.currentUser;

      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));

        if (userDoc.exists()) {
          setNickname(userDoc.data()?.nickname || "Anonymous");
        } else {
          console.log("사용자 문서가 존재하지 않습니다.");
        }
      }
    };

    fetchUserNickname();
  }, []);

  return (
    <div className="text-left w-full">
      {auth.currentUser ? (
        <p className="flex gap-2">
          어서오세요, <strong>{nickname}</strong>님
          <button
            className="px-4 py-0.5 text-sm rounded-lg text-white"
            style={{ background: "#FFC801" }}
            onClick={handleLogout}
          >
            로그아웃
          </button>
        </p>
      ) : (
        <p className="flex gap-2">
          <button
            className="px-4 py-0.5 text-sm rounded-lg text-white"
            style={{ background: "#FFC801" }}
            onClick={() => navigate("/login")}
          >
            로그인
          </button>
          <button
            className="px-4 py-0.5 text-sm rounded-lg text-white"
            style={{ background: "#FFC801" }}
            onClick={() => navigate("/signup")}
          >
            회원가입
          </button>
        </p>
      )}
    </div>
  );
};

export default Comments;
