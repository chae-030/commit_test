import React from "react";
import Button from "../components/mainComponent/Button";
import Image from "../components/mainComponent/Image";
import MainImag from "../images/main.jpg";

const Home = () => {
  return (
    <div className="flex justify-center items-center min-h-screen text-center">
      <div>
        <h2>내 성격과 맞는 IT 직군 찾기</h2>
        <h5>IT 업계로 취업을 하게 된다면 나에게 어울리는 직군은 무엇일까요?</h5>
        <Image src={MainImag} />
        <div className="grid gap-2">
          <Button
            backgroundColor="bg-brand"
            textColor="text-white"
            text="테스트 시작하기"
          />
          <Button
            backgroundColor="bg-white"
            textColor="bg-brand"
            text="IT 직군 알아보기"
            border="border border-brand"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
