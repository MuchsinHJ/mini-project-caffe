import { environment } from "../Constanst/environment";
import { fetchAPI } from "../utils/fetch";

export const getMenu = async (category?: string, page: number = 1) => {
  let url = `${environment.API_URL}/menu?page=${page}&pageSize=9`;

  if (category) {
    url += `&category=${category}`;
  }

  const result = await fetchAPI(url, {
    method: "GET",
  });

  return result;
};
