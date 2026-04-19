export const filtersSlice = (set) => ({
  filters: [],
  setFilters: ({ type, value }) => {
    set((state) => {
      if (type === undefined && value === undefined) {
        return { filters: [] };
      }
      const updatedFilters = state.filters.filter((f) => f.key !== type);
      if (value !== 'All') {
        updatedFilters.push({ key: type, value });
      }
      return { filters: updatedFilters };
    });
  },
});
