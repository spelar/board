import { useQuery } from "@tanstack/react-query";
import { ErrorResponse } from "../../types/errorResponse";
import { GetBoardApiResponse } from "../../types/home/response";
import { getBoardApi } from "../../services/api/home";

type useGetBoardProps = {
  boardType: string;
  per_page: number;
  page: number;
};

const useGetBoard = ({ boardType, per_page = 10, page }: useGetBoardProps) => {
  const query = useQuery<GetBoardApiResponse, ErrorResponse>({
    queryKey: [boardType],
    queryFn: () => getBoardApi({ boardType, per_page, page }),
  });
  return query;
};

export default useGetBoard;
