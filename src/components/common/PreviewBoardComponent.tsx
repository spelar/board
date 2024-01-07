import styled from "@emotion/styled";
import { Board } from "../../types/home";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { formatShortCreatedAt } from "../../utils";
import SkeletonBoardComponent from "./SkeletonBoardComponent";

type PreviewBoardComponentProps = {
  title: string;
  boardList: Board[];
  boardType: string;
};

function PreviewBoardComponent({
  title,
  boardList,
  boardType,
}: PreviewBoardComponentProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (boardList) {
      setLoading(false);
    }
  }, [boardList]);

  return (
    <PreviewBoardContainer>
      <PreviewBoardNavLink to={`${boardType}/list`}>
        {title}
      </PreviewBoardNavLink>
      {loading
        ? Array.from({ length: 1 }).map((_, index) => (
            <SkeletonBoardComponent
              key={`skeletonBoard-${index}`}
              skeletonLength={5}
            />
          ))
        : boardList.map((item) => (
            <PostInfoContainer key={item.id}>
              <span>{item.title}</span>
              <span>{formatShortCreatedAt(item.created_at)}</span>
            </PostInfoContainer>
          ))}
    </PreviewBoardContainer>
  );
}

const PreviewBoardContainer = styled.div`
  width: 48%;
  &:first-of-type {
    margin-right: 2%;
  }
  &:last-child {
    margin-left: 2%;
  }
`;

const PreviewBoardNavLink = styled(NavLink)`
  display: inline-block;
  padding-bottom: 15px;
  color: #000;
  font-size: 1.8rem;
`;

const PostInfoContainer = styled.div`
  display: flex;
  overflow: hidden;
  margin: 8px 0px;
  span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    &:first-of-type {
      width: 60%;
    }
    &:last-child {
      flex-grow: 1;
      text-align: right;
    }
  }
`;

export default PreviewBoardComponent;
