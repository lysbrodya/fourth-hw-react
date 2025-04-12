import axios from "axios";

axios.defaults.baseURL = "https://hn.algolia.com/api/v1";

export const fetchArticlesWithTopic = async (topic, page) => {
  const response = await axios.get("/search", {
    params: {
      query: topic,
      hitsPerPage: 10,
      page,
    },
  });
  return response.data.hits;
};
