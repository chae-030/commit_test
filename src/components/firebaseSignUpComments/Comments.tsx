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
        <p>
          어서오세요, <strong className="mr-1 text-blue-600">{nickname}</strong>님
          <div className="flex gap-2">
            <button
              className="[text-shadow:_1px_1px_1px_rgb(0_0_0_/_40%)] shadow text-xs rounded-lg h-8 py-2 px-8 border text-white border-white"
              style={{ background: "#FFC801" }}
              onClick={handleLogout}
            >
              로그아웃
            </button>
          </div>
        </p>
      ) : (
        <p>
          어서오세요, <strong className="mr-1 text-blue-600">방문자</strong>님
          <div className="flex gap-2">
            <button
              className="[text-shadow:_1px_1px_1px_rgb(0_0_0_/_40%)] shadow text-xs rounded-lg h-8 py-2 px-8 border text-white border-white"
              style={{ background: "#bbb", border: "solid #fff 1px" }}
              onClick={() => navigate("/login")}
            >
              로그인
            </button>
            <button
              className="[text-shadow:_1px_1px_1px_rgb(0_0_0_/_40%)] shadow text-xs rounded-lg h-8 py-2 px-8 border text-white border-white"
              style={{ background: "#FFC801" }}
              onClick={() => navigate("/signup")}
            >
              회원가입
            </button>
          </div>
        </p>
      )}
    </div>
  );
};

export default Comments;
