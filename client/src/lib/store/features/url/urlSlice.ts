import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  url: "",
  urlAttributes: {},
  urlStatus: "",
  urlAnalysisUrl: "",
}

export const urlSlice = createSlice({
  name: 'url',
  initialState,
  reducers: {
    setUrl: (state, action: {
      type: any,
      payload: string
    }) => {
      state.url = action.payload
    },
    clearUrl: (state) => {
      state.url = ""
    },
    setUrlAttributes: (state, action: {
      type: any,
      payload: any
    }) => {
      state.urlAttributes = action.payload
    },
    clearUrlAttributes: (state) => {
      state.urlAttributes = {}
    },
    setUrlStatus: (state, action: {
      type: any,
      payload: string
    }) => {
      state.urlStatus = action.payload
    },
    clearUrlStatus: (state) => {
      state.urlStatus = ""
    },
    setUrlAnalysisUrl: (state, action: {
      type: any,
      payload: string
    }) => {
      state.urlAnalysisUrl = action.payload
    },
    clearUrlAnalysisUrl: (state) => {
      state.urlAnalysisUrl = ""
    }
  }
})

export const { setUrl, setUrlAttributes, setUrlStatus, setUrlAnalysisUrl, clearUrl, clearUrlAttributes, clearUrlStatus, clearUrlAnalysisUrl } = urlSlice.actions;

export default urlSlice.reducer;