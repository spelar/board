import { useMutation } from "@tanstack/react-query";
import useGlobalToast from "../useGlobalToast";
import { ErrorResponse } from "../../types/errorResponse";
import { UpdateBoardProps } from "../../types/common";
import { updateBoardApi } from "../../services/api/common";
import { BaseResponse } from "../../types/response";

const useUpdateBoard = () => {
  const { generateToast } = useGlobalToast();

  const mutation = useMutation<BaseResponse, ErrorResponse, UpdateBoardProps>(
    ({ title, body, firstSegment, boardNumber }: UpdateBoardProps) =>
      updateBoardApi({ title, body, firstSegment, boardNumber }),

    {
      onSuccess: (_, { firstSegment }) => {
        generateToast({
          message: "게시물을 수정하였습니다.",
          type: "success",
        });
      },
    }
  );

  return mutation;
};

export default useUpdateBoard;
