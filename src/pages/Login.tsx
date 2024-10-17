import React, { useState } from "react";
import { auth } from "../api/firebaseConfig";
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
      navigate("/comments");
    } catch (error) {
      setError("로그인에 실패했습니다.");
      console.error("Error logging in: ", error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-center text-3xl font-bold [color:_#FFC801]">로그인</h2>
      <form onSubmit={handleLogin} className="flex flex-col gap-5 w-4/5 p-5 border mt-5 rounded-2xl">
        <div className="flex flex-col gap-3">
          <input
            className="shadow text-xs rounded-lg h-8 py-2 px-5 border"
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="shadow text-xs rounded-lg h-8 py-2 px-5 border"
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div className="flex justify-end gap-2">
          <button
            className="[background:_#FFC801] [text-shadow:_1px_1px_1px_rgb(0_0_0_/_40%)] shadow text-xs rounded-lg h-8 py-2 px-8 border text-white border-white"
            type="submit"
            style={{ background: "#bbb", border: "solid #fff 1px" }}
          >
            로그인
          </button>
          <button
            className="[background:_#FFC801] [text-shadow:_1px_1px_1px_rgb(0_0_0_/_40%)] shadow text-xs rounded-lg h-8 py-2 px-8 border text-white border-white"
            onClick={() => navigate("/comments/signup")}
          >
            회원가입
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
