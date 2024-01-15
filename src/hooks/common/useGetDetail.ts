import { useQuery } from "@tanstack/react-query";
import { ErrorResponse } from "../../types/errorResponse";
import { GetDetailApiResponse } from "../../types/common/response";
import { getBoardDetailApi } from "../../services/api/common";

type useGetDetailProps = {
  firstSegment: string;
  boardNumber: number | null;
};

const useGetDetail = ({ firstSegment, boardNumber }: useGetDetailProps) => {
  return useQuery<GetDetailApiResponse, ErrorResponse>(
    ["detail", { firstSegment, boardNumber }],
    () => getBoardDetailApi({ firstSegment, boardNumber }),
    { enabled: false }
  );
};

export default useGetDetail;
