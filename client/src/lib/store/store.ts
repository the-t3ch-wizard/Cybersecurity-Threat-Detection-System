import { combineReducers, configureStore } from '@reduxjs/toolkit'
import counterReducer from "./features/counter/counterSlice"
import themeReducer from "./features/theme/themeSlice"

const rootReducer = combineReducers({
  counter: counterReducer,
  theme: themeReducer,
})

const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store