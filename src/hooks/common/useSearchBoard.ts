import { useQuery } from "@tanstack/react-query";
import { ErrorResponse } from "../../types/errorResponse";
import { GetRepositoryApiResponse } from "../../types/common/response";
import { searchBoardApi } from "../../services/api/common";

type useSearchBoardProps = {
  boardType: string;
  searchFilter: string;
  q: string;
};

const useSearchBoard = ({
  boardType,
  searchFilter,
  q,
}: useSearchBoardProps) => {
  const query = useQuery<GetRepositoryApiResponse, ErrorResponse>({
    queryKey: [`/search/${searchFilter}`, q],
    queryFn: () => searchBoardApi({ boardType, searchFilter, q }),
    enabled: false,
  });

  return {
    data: query.data,
    refetch: query.refetch,
  };
};

export default useSearchBoard;
