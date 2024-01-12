import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/type";
import useGetBoard from "../hooks/home/useGetBoard";
import useGetRepository from "../hooks/common/useGetRepository";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import SearchComponent from "../components/common/SearchComponent";
import { formatFullCreatedAt } from "../utils";
import { useNavigate } from "react-router-dom";
import { setItem } from "../redux/modules/detail/slice";
import PaginationComponent from "../components/common/PaginationComponent";

const PAGE_SIZE = 10;

interface BoardPageProps {
  boardType: string;
  repositoryType: string;
}

function BoardPage({ boardType, repositoryType }: BoardPageProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchedBoardList = useSelector(
    (state: RootState) => state.search.searchedBoardList
  );
  const [currentPage, setCurrentPage] = useState(1);
  const { data: boardList, refetch: getBoardList } = useGetBoard({
    boardType,
    per_page: PAGE_SIZE,
    page: currentPage,
  });

  const { data: repositoryInfo } = useGetRepository({
    boardType: repositoryType,
  });

  const displayedBoardList =
    searchedBoardList.length > 0 ? searchedBoardList : boardList;

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleRowClick = (item: any, itemId: number | string) => {
    dispatch(setItem(item));
    navigate(`/${boardType}/detail/${itemId}`);
  };

  useEffect(() => {
    getBoardList();
  }, [currentPage, getBoardList]);

  return (
    <>
      <SearchContainer aria-label="검색 섹션">
        <SearchComponent boardType={boardType} />
        <button onClick={() => navigate(`/${boardType}/write`)}>글쓰기</button>
      </SearchContainer>
      <TableContainer>
        <Table aria-label={`${boardType} 게시판`}>
          <thead>
            <TableRow>
              <TableHeader>글 번호</TableHeader>
              <TableHeader>제목</TableHeader>
              <TableHeader>작성자</TableHeader>
              <TableHeader>작성일</TableHeader>
            </TableRow>
          </thead>
          <tbody>
            {displayedBoardList && displayedBoardList.length > 0 ? (
              displayedBoardList.map((item) => (
                <TableRow
                  key={item.id}
                  onClick={() => handleRowClick(item, item.number)}
                >
                  <TableCell>{item.number}</TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>
                    <ProfileImage
                      src={item.user.avatar_url}
                      alt={`${item.user.login}의 프로필 이미지`}
                    />
                    {item.user.login}
                  </TableCell>
                  <TableCell>{formatFullCreatedAt(item.created_at)}</TableCell>
                </TableRow>
              ))
            ) : (
              <tr>
                <td colSpan={4}>
                  {" "}
                  <NoDataMessage>등록된 게시글이 없습니다.</NoDataMessage>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </TableContainer>

      <PaginationComponent
        currentPage={currentPage}
        totalPages={
          Math.ceil((repositoryInfo?.open_issues_count || 0) / PAGE_SIZE) || 1
        }
        onPageChange={handlePageChange}
        aria-label="페이지 네비게이션"
      />
    </>
  );
}

const SearchContainer = styled.div`
  display: flex;
  align-items: center;

  > *:not(:last-child) {
    margin-right: 8px;
  }
`;

const TableContainer = styled.div`
  margin: 0 auto;
  min-height: 520px;
`;

const Table = styled.table`
  margin-top: 20px;
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  padding: 10px;
  background-color: #f2f2f2;
  border: 1px solid #ddd;
  text-align: left;
`;

const TableRow = styled.tr`
  &:nth-of-type(even) {
    background-color: #f9f9f9;
  }
  &:hover {
    background-color: #eaeaea;
    cursor: pointer;
  }
`;

const TableCell = styled.td`
  overflow: hidden;
  padding: 10px;
  border: 1px solid #ddd;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const ProfileImage = styled.img`
  width: 25px;
  height: 25px;
  border-radius: 50%;
`;

const NoDataMessage = styled.div`
  padding: 60px 0px;
  text-align: center;
  font-size: 16px;
`;

export default BoardPage;
