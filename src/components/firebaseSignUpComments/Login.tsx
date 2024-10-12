import React, { useState } from "react";
import { auth } from "./firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // 이메일 인증 여부 확인
      if (!user.emailVerified) {
        setError("이메일 인증이 필요합니다. 이메일을 확인해주세요.");
        return;
      }

      console.log("로그인 성공");
      navigate("/maincomment");
    } catch (error) {
      setError("로그인에 실패했습니다.");
      console.error("Error logging in: ", error);
    }
  };

  return (
    <div>
      <h2>로그인</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">로그인</button>
        <button onClick={() => navigate("/signup")}>회원가입</button>
      </form>
    </div>
  );
};

export default Login;
