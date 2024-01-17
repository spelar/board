import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/type";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { getPathSegment } from "../utils";
import useGetDetail from "../hooks/common/useGetDetail";
import { setItem } from "../redux/modules/detail";
import useUpdateBoard from "../hooks/common/useUpdateBoard";

function EditPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const item = useSelector((state: RootState) => state.detail.item);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [firstSegment, setFirstSegment] = useState<string>("");
  const [boardNumber, setBoardNumber] = useState<number | null>(null);
  const {
    data: detailData,
    isSuccess: isGetDetailSuccess,
    refetch: getDetail,
  } = useGetDetail({ firstSegment, boardNumber });
  const { isSuccess: isUpdateSuccess, mutate: updateBoard } = useUpdateBoard();

  useEffect(() => {
    if (isUpdateSuccess) {
      setTimeout(() => {
        window.location.href = `/${firstSegment}/list`;
      }, 1000);
    }
  }, [isUpdateSuccess, firstSegment]);

  useEffect(() => {
    if (item === null && boardNumber !== null) {
      getDetail();
    }
  }, [boardNumber, firstSegment, item, getDetail]);

  useEffect(() => {
    if (item) {
      setTitle(item.title);
      setBody(item.body);
    }
  }, [item]);

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
    if (isGetDetailSuccess) {
      dispatch(setItem(detailData));
    }
  }, [dispatch, isGetDetailSuccess, detailData]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (boardNumber !== null) {
      updateBoard({ title, body, firstSegment, boardNumber });
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <SectionTitle>게시글 수정</SectionTitle>
        <Label htmlFor="title">제목</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Label htmlFor="body">내용</Label>
        <Textarea
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <ButtonGroup>
          <Button type="button" onClick={() => navigate(-1)}>
            취소
          </Button>
          <Button type="submit">저장</Button>
        </ButtonGroup>
      </form>
    </Container>
  );
}

const Container = styled.div`
  margin: auto;
  padding: 20px;
  max-width: 800px;
  background-color: #f3f3f3;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  margin-bottom: 15px;
  color: #333;
  font-size: 24px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  color: #444;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Textarea = styled.textarea`
  margin-bottom: 20px;
  padding: 10px;
  width: 100%;
  height: 150px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Button = styled.button`
  margin-left: 10px;
  padding: 10px 20px;
  color: #fff;
  border-radius: 4px;
  border: none;
  font-weight: bold;
  cursor: pointer;

  &:first-of-type {
    background-color: #dc3545;
  }

  &:last-of-type {
    background-color: #007bff;
  }

  &:hover {
    opacity: 0.9;
  }
`;

export default EditPage;
