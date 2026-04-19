import styles from "./Searchbar.module.css";
import { useStore } from "../../store";
import { useEffect } from "react";
import { getSearchedShows, getShows } from "../../api";

export const Searchbar = () => {
  const { query, setQuery, setShows } = useStore();
  const url = new URL(window.location.href);

  const handleSearch = async (e) => {
    e.preventDefault();
    setQuery(query);
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    setQuery(e.target.value);
    url.searchParams.set("q", e.target.value);
    window.history.replaceState({}, "", url);
  };

  useEffect(() => {
    const q = url.searchParams.get("q");
    if (q) {
      setQuery(q);
      getSearchedShows(q).then((data) => {
        setShows(data);
      });
      return;
    }
    getShows().then((data) => {
      setShows(data);
    });
  }, [, query]);

  return (
    <div className={styles.searchBar}>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search for shows..."
          className={styles.searchInput}
        />
        <button type="submit" className={styles.searchButton}>
          Search
        </button>
      </form>
    </div>
  );
};
