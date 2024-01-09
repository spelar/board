import { useQuery } from "@tanstack/react-query";
import { ErrorResponse } from "../../types/errorResponse";
import { GetRepositoryApiResponse } from "../../types/common/response";
import { getRepositoryApi } from "../../services/api/common";

type useGetRepositoryProps = {
  boardType: string;
};

const useGetRepository = ({ boardType }: useGetRepositoryProps) => {
  const query = useQuery<GetRepositoryApiResponse, ErrorResponse>({
    queryKey: [`/repository/${boardType}`],
    queryFn: () => getRepositoryApi({ boardType }),
  });
  return query;
};

export default useGetRepository;
