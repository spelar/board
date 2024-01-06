import { useCallback, useEffect, useState } from "react";
import styled from "@emotion/styled";

type SliderComponentProps = {
  images: string[];
  width?: string;
  height?: string;
  autoPlay?: boolean;
  velocity?: number;
  alt?: string;
};

function SliderComponent({
  images,
  width,
  height,
  autoPlay = false,
  velocity = 2000,
  alt = "슬라이드 이미지",
}: SliderComponentProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const onHandleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (autoPlay) {
      intervalId = setInterval(() => {
        onHandleNext();
      }, velocity);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [onHandleNext, velocity, autoPlay]);

  return (
    <SliderContainer>
      <SlideWrap width={width} height={height}>
        {images.map((image, index) => (
          <Slide
            key={`slide-${index}`}
            src={image}
            alt={`${alt}-${index}`}
            isVisible={index === currentIndex}
          />
        ))}
      </SlideWrap>
      <IndicatorsContainer>
        {images.map((_, index) => (
          <Indicator
            key={`indicator-${index}`}
            isActive={index === currentIndex}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </IndicatorsContainer>
    </SliderContainer>
  );
}

const SliderContainer = styled.div`
  position: relative;
  margin: 0 auto;
`;

const SlideWrap = styled.div<{ width?: string; height?: string }>`
  overflow: hidden;
  position: relative;
  margin: 0 auto;
  max-width: 100%;
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "300px"};
`;

const Slide = styled.img<{ isVisible: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  opacity: ${(props) => (props.isVisible ? "1" : "0")};
  max-width: 100%;
  transition: opacity 0.5s ease-in-out;
`;

const IndicatorsContainer = styled.div`
  position: absolute;
  bottom: -30px;
  left: 50%;
  display: flex;
  transform: translateX(-50%);
`;

const Indicator = styled.div<{ isActive: boolean }>`
  margin: 0 5px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${(props) => (props.isActive ? "#007BFF" : "#ced4da")};
  cursor: pointer;
`;

export default SliderComponent;
