export const querySlice = (set) => ({
  query: "",
  results: [],
  setResults: (results) => set({ results }),
  setQuery: (query) => set({ query }),
});
