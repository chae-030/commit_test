import { useState, useEffect } from "react";
import { auth, db } from "../../api/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import Button from "../mainComponent/Button";

const IsLogIn = () => {
  const [nickname, setNickname] = useState<string | null>(null);
  const navigate = useNavigate();

  /* 
  1. 중복된 useEffect 제거 fetchUserNickname함수 삭제하고 unsubscribe랑 그냥 같이함
  2. 비동기 함수에서 상태 업데이트 방지하기 위해 플래그 사용
  */
  useEffect(() => {
    let isMounted = true; // 플래그 설정
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));

        if (userDoc.exists()) {
          setNickname(userDoc.data()?.nickname || "Anonymous");
        } else {
          console.log("사용자 문서가 존재하지 않습니다.");
        }
      } else {
        if (isMounted) {
          setNickname(null); // 로그아웃 시 닉네임 초기화
        }
      }
    });
    return () => {
      isMounted = false; // 컴포넌트 언마운트 시 플래그 해제
      unsubscribe(); // 리스너 해제
    };
  }, []);

  // 로그아웃 핸들러
  const handleLogout = async () => {
    try {
      await signOut(auth); // Firebase에서 로그아웃
      console.log("로그아웃 성공");
      navigate("/comments"); // 로그아웃 후 메인 페이지로 이동
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  return (
    <div className="w-full">
      {auth.currentUser ? (
        <div className="flex gap-2 items-center justify-between w-full">
          <p>
            어서오세요,{" "}
            <strong className="mr-1 text-blue-600">{nickname}</strong>님
          </p>
          <Button
            text={"로그아웃"}
            otherStyle="text-xs py-2 mt-0"
            backgroundColor={"bg-white"}
            textColor={"bg-brand"}
            border={"border"}
            onClick={handleLogout}
          />
        </div>
      ) : (
        <div className="flex items-center justify-between w-full">
          <p>
            어서오세요, <strong className="mr-1 text-blue-600">방문자</strong>님
          </p>
          <div>
            <Button
              text={"로그인"}
              otherStyle="text-xs py-1 mt-0 mr-2"
              backgroundColor={"bg-white"}
              textColor={"bg-brand"}
              border={"border"}
              onClick={() => navigate("/comments/login")}
            />
            <Button
              text={"회원가입"}
              otherStyle="text-xs py-1 mt-0"
              backgroundColor={"bg-brand"}
              textColor={"text-white"}
              onClick={() => navigate("/comments/signup")}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default IsLogIn;
