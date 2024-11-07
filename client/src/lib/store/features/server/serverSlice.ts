import { createSlice } from "@reduxjs/toolkit"
import { getServerStatus } from "../../../../services/server"

const initialState = {
  status: false,
}

export const serverSlice = createSlice({
  name: 'server',
  initialState,
  reducers: {
    setServerStatus: (state, action) => {
      state.status = action.payload
    },
    clearServerStatus: (state) => {
      state.status = false
    }
  }
})

export const { setServerStatus, clearServerStatus } = serverSlice.actions;

export default serverSlice.reducer;

export const setServerStatusService = () => async (dispatch: any) => {
  try {
    const status = await getServerStatus();
    dispatch(setServerStatus(status))
  } catch (error) {
    console.log(error);
  }
}