import { useMutation } from "@tanstack/react-query";
import useGlobalToast from "../useGlobalToast";
import { ErrorResponse } from "../../types/errorResponse";
import { CreateBoardProps } from "../../types/common";
import { createBoardApi } from "../../services/api/common";
import { BaseResponse } from "../../types/response";

const useCreateBoard = () => {
  const { generateToast } = useGlobalToast();

  const mutation = useMutation<BaseResponse, ErrorResponse, CreateBoardProps>(
    ({ title, body, firstSegment }: CreateBoardProps) =>
      createBoardApi({ title, body, firstSegment }),

    {
      onSuccess: (_, { firstSegment }) => {
        generateToast({
          message: "게시물을 등록하였습니다.",
          type: "success",
        });
      },
    }
  );

  return mutation;
};

export default useCreateBoard;
