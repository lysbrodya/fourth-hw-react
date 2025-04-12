import axios from "axios";

axios.defaults.baseURL = "https://api.unsplash.com";
const ACCESS_KEY = "ktfjpQGcfjp6d91ONHWKqtbnT0B3NCk9CiaovDWYZGo";

export const fetchImages = async (searchValue, page) => {
  const response = await axios.get("/search/photos", {
    params: {
      query: searchValue,
      page,
      per_page: 12,
      client_id: ACCESS_KEY,
    },
  });
  return response.data.results;
};
