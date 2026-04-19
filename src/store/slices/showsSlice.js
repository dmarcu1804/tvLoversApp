export const showsSlice = (set) => ({
  query: '',
  setQuery: (value) => set({ query: value }),

  shows: [],
  setShows: (value) => set({ shows: value }),

  loading: false,
  setLoading: (value) => set({ loading: value }),

  error: null,
  setError: (value) => set({ error: value }),
});
