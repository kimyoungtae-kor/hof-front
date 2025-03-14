import React from "react";
import CustomSlider from "./CustomSlider"; // 위에서 만든 슬라이더 컴포넌트
import "../../../styles/slider.scss";

const imageUrls = [
  "https://hof-bucket.s3.ap-northeast-2.amazonaws.com/prodDetail/2025/02/25/85390c0d-2bf4-4d2a-a3b2-9ca61215bab9.jpg",
  "https://hof-bucket.s3.ap-northeast-2.amazonaws.com/prodDetail/2025/02/25/969dfbeb-2cda-4a36-8bb8-e448442beab7.jpg",
  "https://hof-bucket.s3.ap-northeast-2.amazonaws.com/prodDetail/2025/03/05/b5aace2f-1259-4216-8389-32fd644554c6.webp",
];

const SliderPage = () => {
  return (
    <div>
      <CustomSlider images={imageUrls} />
    </div>
  );
};

export default SliderPage;
