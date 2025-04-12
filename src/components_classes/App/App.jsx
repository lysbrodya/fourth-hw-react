import { useEffect, useState } from "react";
import ArticleList from "../ArticleList/ArticleList";
import { DotLoader } from "react-spinners";
import { fetchArticlesWithTopic } from "../../articles-api.js";
import SearchForm from "../SearchForm/SearchForm.jsx";

const App = () => {
  // 1. Оголошуємо стан
  const [query, setQuery] = useState("");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (query === "") {
      return;
    }

    async function getData() {
      try {
        setLoading(true);
        setError(false);
        const data = await fetchArticlesWithTopic(query, page);
        setArticles((prevArticles) => {
          return [...prevArticles, ...data];
        });
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, [query, page]);

  const hendleSearch = async (topic) => {
    setQuery(topic);
    setPage(1);
    setArticles([]);
    // setError(false);
    // setLoading(true);
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };
  return (
    <div>
      <h1>Latest articles</h1>
      <SearchForm onSearch={hendleSearch} />

      {error && (
        <ErrorMessage message="Whoops, something went wrong! Please try reloading this page!" />
      )}
      {articles.length > 0 && <ArticleList items={articles} />}
      {articles.length > 0 && !loading && (
        <button onClick={handleLoadMore}>Load more</button>
      )}
      {loading && <DotLoader color="purple" />}
    </div>
  );
};

export default App;

// useEffect(() => {
//   async function fetchArticles() {
//     try {
//       setLoading(true);
//       const data = await fetchArticlesWithTopic("react");
//       // 2. Записуємо дані в стан
//       setArticles(data);
//     } catch (error) {
//       setError(true);
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   }

//   fetchArticles();
// }, []);
