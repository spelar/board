import { NavLink } from "react-router-dom";
import styled from "@emotion/styled";

function Gnb() {
  return (
    <GNB>
      <ul>
        <li>
          <StyledLink to="/">Home</StyledLink>
        </li>
        <li>
          <StyledLink to="/question-board/list">질문 게시판</StyledLink>
        </li>
        <li>
          <StyledLink to="/free-board/list">자유 게시판</StyledLink>
        </li>
      </ul>
    </GNB>
  );
}

const GNB = styled.div`
  ul {
    li {
      display: inline-block;
    }
  }
  padding-left: 180px;
  width: 100%;
  height: 85px;
  background-color: #fff;
  border-bottom: 1px solid rgba(5, 20, 31, 0.2);
  line-height: 85px;
  box-sizing: border-box;
`;
const StyledLink = styled(NavLink)`
  position: relative;
  padding: 0 20px;
  color: #05141f;
  text-decoration: none;
  font-size: 1.6rem;
  font-weight: 400;

  &::after {
    content: "";
    position: absolute;
    bottom: -6px;
    left: 20px;
    right: 0;
    width: calc(100% - 40px);
    height: 1px;
    background-color: transparent;
    transition: all 0.2s ease;
  }

  &:hover::after,
  &.active::after {
    background-color: #05141f;
  }

  &.active {
    font-weight: bold;
  }
`;

export default Gnb;
