import { environment } from "../Constanst/environment";
import { fetchAPI } from "../utils/fetch";

export const getMenu = async (category?: string) => {
  let url = `${environment.API_URL}/menu?page=1&pageSize=25`;

  if (category) {
    url += `&category=${category}`;
  }

  const result = await fetchAPI(url, {
    method: "GET",
  });

  return result;
};
