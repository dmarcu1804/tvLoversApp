import styles from "./Sidebar.module.css";
import { useEffect, useState } from "react";
import { useStore } from "../../store";

export const Sidebar = ({ filterContent }) => {
  console.log("Received filterContent:", filterContent);
  const { filters, setFilters } = useStore();
  const [sidebarFilters, setSidebarFilters] = useState([]);

  useEffect(() => {
    setSidebarFilters(
      Object.entries(filterContent)?.map(([key, options]) => ({
        title: key,
        options,
      })),
    );

    const url = new URL(window.location);
    const urlFilters = url.searchParams.get("filters");
    console.log("URL filters on load:", urlFilters);
    if (urlFilters) {
      setTimeout(() => {
        urlFilters.split(",").map((f) => {
          const [key, value] = f.split(":");
          setFilters({ type: key, value });
          console.log(document.getElementById(`${key}-select`));
          if (document.getElementById(`${key}-select`))
            document.getElementById(`${key}-select`).value = value;
        });
      }, 300);
    }
  }, []);

  useEffect(() => {
    const url = new URL(window.location);
    url.searchParams.delete("filters");
    if (filters.length > 0) {
      url.searchParams.set(
        "filters",
        filters.map((f) => `${f.key}:${f.value}`).join(","),
      );
      window.history.pushState({}, "", url);
    }
  }, [filters]);

  const handleFilterChange = (filterTitle, selectedOption) => {
    setFilters({ type: filterTitle, value: selectedOption });
  };

  const clearFilters = () => {
    setFilters([]);
    if (typeof URLSearchParams !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      params.delete("filters");
      window.history.pushState(
        {},
        "",
        `${window.location.pathname}?${params.toString()}`,
      );
      sidebarFilters.forEach((filter) => {
        const selectElement = document.getElementById(`${filter.title}-select`);
        if (selectElement) {
          selectElement.value = "All";
        }
      });
    }
  };

  return (
    <aside className={styles.sidebar}>
      <h2 className={styles.sidebarTitle}>Filters</h2>
      <ul className={styles.sidebarList}>
        {sidebarFilters.map((filter, index) => (
          <li key={index} className={styles.filterItem}>
            <h3 className={styles.filterTitle}>
              {filter.title.charAt(0).toUpperCase() + filter.title.slice(1)}
            </h3>
            <div className={styles.filterOptions}>
              <select
                className={styles.filteroption}
                name={filter.title}
                id={`${filter.title}-select`}
                onChange={(e) => {
                  handleFilterChange(filter.title, e.target.value);
                }}
              >
                {filter.options.map((option, idx) => (
                  <option key={idx} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </li>
        ))}
        <li className={styles.filterItem}>
          <button className={styles.clearButton} onClick={clearFilters}>
            Clear Filters
          </button>
        </li>
      </ul>
    </aside>
  );
};
