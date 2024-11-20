import { useEffect, useState } from "react";
import "../css/Banner.css"

function Banner({images}){
  const [currentIndex, setCurrentIndex] = useState(0); // 현재 슬라이드 인덱스
  const [isPaused, setIsPaused] = useState(false); // 자동 전환 일시 정지 상태

  // 자동 슬라이드 전환
  useEffect(() => {
    if (isPaused) return; // 일시 정지 상태라면 슬라이드 전환 중단

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval); // 클린업
  }, [isPaused, images.length]);

  // 이전 슬라이드
  const handlePrev = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  // 다음 슬라이드
  const handleNext = () => {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };

  // 도트 네비게이션 클릭
  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div
      className="slider"
      onMouseEnter={() => setIsPaused(true)} // 마우스 올릴 때 자동 전환 멈춤
      onMouseLeave={() => setIsPaused(false)} // 마우스 떠날 때 자동 전환 재개
    >
      {/* 슬라이드 이미지 */}
      <div
        className="slider__content"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: "transform 0.5s ease-in-out",
        }}
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index}`}
            className="slider__image"
          />
        ))}
      </div>

      {/* 이전 버튼 */}
      <button className="slider__button slider__button--prev" onClick={handlePrev}>
        ❮
      </button>

      {/* 다음 버튼 */}
      <button className="slider__button slider__button--next" onClick={handleNext}>
        ❯
      </button>

      {/* 도트 네비게이션 */}
      <div className="slider__dots">
        {images.map((_, index) => (
          <button
            key={index}
            className={`slider__dot ${
              currentIndex === index ? "active" : ""
            }`}
            onClick={() => handleDotClick(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};
export default Banner;