const localStorageFavoriteMock = (() => {
  let store = {};

  const getItem = (key) => store[key] || null;
  const setItem = (key, value) => {
    store[key] = value.toString();
  };
  const removeItem = (key) => {
    delete store[key];
  };
  const clear = () => {
    store = {};
  };

  return {
    getItem,
    setItem,
    removeItem,
    clear,
  };
})();

export default localStorageFavoriteMock;
