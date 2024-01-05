import { Outlet } from "react-router-dom";
import styled from "@emotion/styled";
import Gnb from "../components/Gnb";

function PageLayout() {
  return (
    <>
      <Gnb />
      <Container>
        <Outlet />
      </Container>
    </>
  );
}

const Container = styled.div`
  overflow-x: auto;
  margin: 0 auto;
  padding: 100px 35px;
  width: 1350px;
  max-width: 100%;
  box-sizing: border-box;
`;

export default PageLayout;
