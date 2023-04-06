import { API_BASE_URL } from "../utils/constants"

export function useSearch() {
  const search = async (query) => {
    const { data } = await fetch(API_BASE_URL + `/search?q=${query}`).then(j => j.json());
    return data;
  }

  return { search }
}