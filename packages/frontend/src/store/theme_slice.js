import { createSlice } from '@reduxjs/toolkit';

const themesSlice = createSlice({
  name: 'theme',
  initialState: {
    theme: 'elusiveEmperor'
  },
  reducers: {
    setThemeState(state, action) {
      const { theme } = action.payload;
      state.theme = theme;
    }
  }
});

const { setThemeState } = themesSlice.actions;

const setTheme = (newTheme) => (dispatch) => {
  dispatch(setThemeState(newTheme));
};

export {
  setTheme
};

export default themesSlice.reducer;
