import { axiosInstance } from "../../../axiosInstance";
import {
  CreateBoardProps,
  DeleteBoardProps,
  UpdateBoardProps,
  getBoardDetailApiProps,
  getRepositoryApiProps,
  searchBoardApiProps,
} from "../../../types/common";

export const getRepositoryApi = async ({
  boardType,
}: getRepositoryApiProps) => {
  const { data } = await axiosInstance.get(`/repos/spelar/${boardType}`);
  return data;
};

export const getBoardDetailApi = async ({
  firstSegment,
  boardNumber,
}: getBoardDetailApiProps) => {
  const { data } = await axiosInstance.get(
    `/repos/spelar/${firstSegment}/issues/${boardNumber}`
  );
  return data;
};

export const searchBoardApi = async ({
  boardType,
  searchFilter,
  q,
}: searchBoardApiProps) => {
  const { data } = await axiosInstance.get(`/search/issues`, {
    params: {
      q: `is:issue repo:spelar/${boardType} state:open ${q} in:${searchFilter}`,
    },
  });
  return data;
};

export const createBoardApi = async ({
  title,
  body,
  firstSegment,
}: CreateBoardProps) => {
  const { data } = await axiosInstance.post(
    `/repos/spelar/${firstSegment}/issues`,
    {
      title,
      body,
    }
  );
  return data;
};
