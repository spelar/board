import { useMutation } from "@tanstack/react-query";
import useGlobalToast from "../useGlobalToast";
import { BaseResponse } from "../../types/response";
import { ErrorResponse } from "../../types/errorResponse";
import { DeleteBoardProps } from "../../types/common";
import { deleteBoardApi } from "../../services/api/common";

const useDeleteBoard = () => {
  const { generateToast } = useGlobalToast();

  const mutation = useMutation<BaseResponse, ErrorResponse, DeleteBoardProps>(
    ({ firstSegment, id }: DeleteBoardProps) =>
      deleteBoardApi({ firstSegment, id }),

    {
      onSuccess: (_, { firstSegment }) => {
        generateToast({
          message: "게시물을 삭제하였습니다.",
          type: "success",
        });
      },
    }
  );

  return mutation;
};

export default useDeleteBoard;
