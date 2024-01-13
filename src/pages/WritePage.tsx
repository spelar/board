import styled from "@emotion/styled";
import React, { useCallback, useEffect, useState } from "react";
import useCreateBoard from "../hooks/common/useCreateBoard";
import { getPathSegment } from "../utils";

function WritePage() {
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [firstSegment, setFirstSegment] = useState<string>("");
  const [titleError, setTitleError] = useState<boolean>(false);
  const [bodyError, setBodyError] = useState<boolean>(false);
  const { isSuccess: isCreateSuccess, mutate: createBoard } = useCreateBoard();

  useEffect(() => {
    if (isCreateSuccess) {
      setTimeout(() => {
        window.location.href = `/${firstSegment}/list`;
      }, 1000);
    }
  }, [isCreateSuccess, firstSegment]);

  useEffect(() => {
    setFirstSegment(getPathSegment(0) || "default");
  }, []);

  const validateInput = useCallback(() => {
    let isValid = true;
    if (!title) {
      setTitleError(true);
      isValid = false;
    } else {
      setTitleError(false);
    }
    if (!body) {
      setBodyError(true);
      isValid = false;
    } else {
      setBodyError(false);
    }
    return isValid;
  }, [body, title]);

  const handleSubmit = useCallback(() => {
    if (validateInput()) {
      createBoard({ title, body, firstSegment });
    }
  }, [title, body, createBoard, firstSegment, validateInput]);

  return (
    <WritePageContainer>
      <h2>글작성</h2>
      <label htmlFor="title" className="blind">
        제목
      </label>
      <Input
        id="title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="제목을 입력하세요"
        style={{ borderColor: titleError ? "red" : "#ddd" }}
      />
      {titleError && <ErrorMessage>제목을 입력해주세요</ErrorMessage>}
      <label htmlFor="body" className="blind">
        내용
      </label>
      <Textarea
        id="body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="내용을 입력하세요"
        style={{ borderColor: bodyError ? "red" : "#ddd" }}
      />
      {bodyError && <ErrorMessage>내용을 입력해주세요</ErrorMessage>}
      <SubmitButton onClick={handleSubmit}>등록하기</SubmitButton>
    </WritePageContainer>
  );
}

const WritePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
`;

const Input = styled.input`
  margin: 10px 0;
  padding: 10px;
  width: 80%;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Textarea = styled.textarea`
  padding: 10px;
  margin: 10px 0;
  width: 80%;
  height: 150px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  color: white;
  border: none;
  background-color: #007bff;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorMessage = styled.div`
  margin-bottom: 10px;
  color: red;
`;

export default WritePage;
