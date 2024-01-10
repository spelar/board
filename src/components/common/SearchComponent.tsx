import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import useSearchBoard from "../../hooks/common/useSearchBoard";
import { useDispatch } from "react-redux";
import { setSearchResults } from "../../redux/modules/search";

type SearchComponentProps = {
  boardType: string;
};

function SearchComponent({ boardType }: SearchComponentProps) {
  const dispatch = useDispatch();
  const [searchFilter, setSearchFilter] = useState("title");
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const { refetch: searchBoard } = useSearchBoard({
    boardType,
    searchFilter,
    q: searchQuery,
  });

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [showModal]);

  const handleSearchTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchFilter(e.target.value);
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchButtonClick = async () => {
    if (!searchQuery) {
      setModalMessage("검색어를 입력하세요.");
      setShowModal(true);
      return;
    }
    const results = await searchBoard();
    dispatch(setSearchResults(results.data?.items));
  };

  return (
    <>
      {" "}
      <SearchContainer>
        <label htmlFor="search-filter" className="blind">
          검색 유형
        </label>
        <select
          id="search-filter"
          onChange={handleSearchTypeChange}
          aria-label="검색 유형 선택"
        >
          <option value="title">제목</option>
          <option value="content">내용</option>
        </select>

        <label htmlFor="search-query" className="blind">
          검색어
        </label>
        <input
          id="search-query"
          type="text"
          placeholder="검색어를 입력하세요"
          value={searchQuery}
          onChange={handleSearchInputChange}
          aria-label="검색어 입력"
        />

        <button onClick={handleSearchButtonClick} aria-label="검색하기">
          검색
        </button>
      </SearchContainer>
    </>
  );
}

const SearchContainer = styled.div`
  display: flex;
  align-items: center;

  select {
    margin-right: 8px;
    padding: 4px;
  }

  input {
    flex: 1;
    padding: 4px;
  }

  button {
    margin-left: 8px;
    padding: 4px 8px;
    color: white;
    background-color: #007bff;
    border: none;
    cursor: pointer;

    &:hover {
      background-color: #0056b3;
    }
  }
`;

const ModalMessage = styled.p`
  margin: 20px 0px;
  min-width: 300px;
  min-height: 30px;
  text-align: center;
`;

const ModalButton = styled.button`
  padding: 4px 8px;
  color: white;
  background-color: #007bff;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

export default SearchComponent;
