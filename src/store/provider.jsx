import { useStore } from '.';
import { AppContext } from './context';

export const StoreProvider = ({ children }) => {
  const store = useStore();
  return <AppContext.Provider value={store}>{children}</AppContext.Provider>;
};
