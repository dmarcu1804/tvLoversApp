export const debounce = (callback, wait = 300) => {
  let timeoutId = null;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback.apply(this, args);
    }, wait);
  };
};
