import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/type";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatFullCreatedAt, getPathSegment } from "../utils";
import styled from "@emotion/styled";
import useDeleteBoard from "../hooks/common/useDeleteBoard";
import useGetDetail from "../hooks/common/useGetDetail";
import { setItem } from "../redux/modules/detail/slice";

function DetailPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const item = useSelector((state: RootState) => state.detail.item);
  const [firstSegment, setFirstSegment] = useState<string>("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [deletingIssueId, setDeletingIssueId] = useState<number | null>(null);
  const [boardNumber, setBoardNumber] = useState<number | null>(null);
  const { isSuccess: isDeleteSuccess, mutate: deleteBoard } = useDeleteBoard();
  const {
    data: detailData,
    isSuccess: isGetDetailSuccess,
    refetch: getDetail,
  } = useGetDetail({ firstSegment, boardNumber });

  useEffect(() => {
    setFirstSegment(getPathSegment(0) || "default");
    const segment = getPathSegment(2);

    if (segment !== null) {
      const number = parseInt(segment);
      if (!isNaN(number)) {
        setBoardNumber(number);
      }
    }
  }, []);

  useEffect(() => {
    if (item === null && boardNumber !== null) {
      getDetail();
    }
  }, [boardNumber, firstSegment, item, getDetail]);

  useEffect(() => {
    if (isDeleteSuccess) {
      setTimeout(() => {
        navigate(`/${firstSegment}/list`);
      }, 1000);
    }
  }, [isDeleteSuccess, firstSegment, navigate]);

  useEffect(() => {
    if (showConfirmModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [showConfirmModal]);

  useEffect(() => {
    if (isGetDetailSuccess) {
      dispatch(setItem(detailData));
    }
  }, [dispatch, isGetDetailSuccess, detailData]);

  const handleGoToList = () => {
    navigate(`/${firstSegment}/list`);
  };

  const handleDeleteClick = (id: number) => {
    setShowConfirmModal(true);
    setDeletingIssueId(id);
  };

  const confirmDelete = () => {
    if (deletingIssueId !== null) {
      deleteBoard({ firstSegment, id: deletingIssueId });
      setShowConfirmModal(false);
    }
  };

  const cancelDelete = () => {
    setShowConfirmModal(false);
  };

  const handleGoEdit = () => {
    navigate(`/${firstSegment}/edit/${boardNumber}`);
  };

  return (
    <>
      <Container>
        <SectionTitle>
          {firstSegment === "question-board" ? "질문 게시판" : "자유 게시판"}
        </SectionTitle>
        <PostTitle>{item?.title}</PostTitle>
        <UserInfo>
          <UserImage
            src={item?.user.avatar_url}
            width={25}
            height={25}
            alt="User"
          />
          {item?.created_at && formatFullCreatedAt(item?.created_at)}
        </UserInfo>
        <PostBody>{item?.body}</PostBody>
        <ButtonGroup>
          <button onClick={handleGoEdit}>수정</button>
          {item?.id && (
            <button onClick={() => handleDeleteClick(item.number)}>삭제</button>
          )}
          <button onClick={handleGoToList}>목록</button>
        </ButtonGroup>
      </Container>
    </>
  );
}

const Container = styled.div`
  margin: auto;
  padding: 50px;
  max-width: 800px;
  background-color: #fff;
`;

const SectionTitle = styled.h2`
  margin-bottom: 25px;
  font-size: 24px;
`;

const PostTitle = styled.h3`
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: bold;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 50px;
`;

const UserImage = styled.img`
  margin-right: 10px;
  border-radius: 50%;
`;

const PostBody = styled.pre`
  white-space: pre-wrap;
  margin-bottom: 50px;
  padding-bottom: 50px;
  border-bottom: 1px solid #ccc;
`;

const ButtonGroup = styled.div`
  button {
    margin-right: 10px;
    padding: 10px 20px;
    color: white;
    background-color: #007bff;
    border: none;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    cursor: pointer;

    &:hover {
      background-color: #0056b3;
    }
  }
`;

export default DetailPage;
