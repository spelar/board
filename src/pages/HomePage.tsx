import { useEffect } from "react";
import styled from "@emotion/styled";
import { HOME } from "../constants/home";
import SliderComponent from "../components/common/SliderComponent";
import { slider_bg_1, slider_bg_2, slider_bg_3, slider_bg_4 } from "../images";
import PreviewBoardComponent from "../components/common/PreviewBoardComponent";
import useGetBoard from "../hooks/home/useGetBoard";

function HomePage() {
  const images = [slider_bg_1, slider_bg_2, slider_bg_3, slider_bg_4];
  return (
    <>
      <SliderComponent
        images={images}
        width="100%"
        height="450px"
        autoPlay={true}
        alt={`${HOME.IMAGES_ALT.WINTER}`}
      ></SliderComponent>
    </>
  );
}

const BoardContainer = styled.div`
  display: flex;
  margin-top: 70px;
`;

export default HomePage;
