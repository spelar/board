import { axiosInstance } from "../../../axiosInstance";
import { getBoardApiProps } from "../../../types/home";

export const getBoardApi = async ({
  boardType,
  per_page,
  page,
}: getBoardApiProps) => {
  const { data } = await axiosInstance.get(`repos/spelar/${boardType}/issues`, {
    params: { per_page, page, state: "open" },
  });
  return data;
};
