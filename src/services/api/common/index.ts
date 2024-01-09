import { axiosInstance } from "../../../axiosInstance";
import { getRepositoryApiProps } from "../../../types/common";

export const getRepositoryApi = async ({
  boardType,
}: getRepositoryApiProps) => {
  const { data } = await axiosInstance.get(`/repos/spelar/${boardType}`);
  return data;
};
