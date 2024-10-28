import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  theme: "dark",
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setDarkTheme: (state) => {
      state.theme = "dark"
    },
    setLightTheme: (state) => {
      state.theme = "light"
    }
  }
})

export const { setDarkTheme, setLightTheme } = themeSlice.actions;

export default themeSlice.reducer;