const useLocalStorage = (key, defaultInitialState) => {
  const localState = localStorage.getItem(key);

  let state;

  try {
    state = localState ? JSON.parse(localState) : defaultInitialState;
  } catch(err) {
    state = defaultInitialState
  }


  return [
    state,
    (value) => {
      localStorage.setItem(key, value ? JSON.stringify(value) : '')
    }
  ]
}

export default useLocalStorage;
