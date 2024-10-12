import React, { useState, useEffect } from "react";
import { auth, db } from "./firebaseConfig";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [nicknameError, setNicknameError] = useState("");
  const [isNicknameAvailable, setIsNicknameAvailable] = useState<
    boolean | null
  >(null);
  const navigate = useNavigate();
  useEffect(() => {
    // 닉네임 사용 가능 여부 확인
    const checkNicknameAvailability = async () => {
      if (nickname.length > 0 && nickname.length <= 10) {
        const q = query(
          collection(db, "users"),
          where("nickname", "==", nickname)
        );
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          setIsNicknameAvailable(true); // 닉네임 사용 가능
          setNicknameError("");
        } else {
          setIsNicknameAvailable(false); // 닉네임 사용 불가능
          setNicknameError("이미 사용 중인 닉네임입니다.");
        }
      } else if (nickname.length > 10) {
        setIsNicknameAvailable(false);
        setNicknameError("닉네임은 10글자 이내로 입력해주세요.");
      } else {
        setIsNicknameAvailable(null);
        setNicknameError("");
      }
    };

    checkNicknameAvailability();
  }, [nickname]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!isNicknameAvailable) {
      setError("닉네임을 확인해주세요.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Firestore에 사용자 정보 저장
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email,
        nickname,
      });

      // 이메일 인증 발송
      await sendEmailVerification(user);
      console.log("이메일 인증 발송됨:", user);

      // 회원가입 성공 처리 (이메일 인증이 완료되면 가입 완료)
      alert("이메일 인증을 완료해주세요!");
      navigate("/login");
    } catch (error) {
      setError("회원가입에 실패했습니다.");
      console.error("Error signing up: ", error);
    }
  };

  return (
    <div>
      <h2>회원가입</h2>
      <form onSubmit={handleSignup}>
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="닉네임 (10글자 이내)"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          required
        />
        {nicknameError && <p style={{ color: "red" }}>{nicknameError}</p>}
        {isNicknameAvailable === true && (
          <p style={{ color: "green" }}>사용 가능한 닉네임입니다.</p>
        )}
        {isNicknameAvailable === false && (
          <p style={{ color: "red" }}>사용 불가능한 닉네임입니다.</p>
        )}

        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
};

export default Signup;