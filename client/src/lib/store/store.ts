import { combineReducers, configureStore } from '@reduxjs/toolkit'
import counterReducer from "./features/counter/counterSlice"
import themeReducer from "./features/theme/themeSlice"
import serverReducer from "./features/server/serverSlice"

const rootReducer = combineReducers({
  counter: counterReducer,
  theme: themeReducer,

  // The below reducer is used to store that whether the server is currently running on or not
  // since the server is deployed on render so needs some time to start for first time
  server: serverReducer,
})

const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store