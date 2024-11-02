import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  url: "",
  urlAttributes: {},
  urlStatus: "",
}

export const urlSlice = createSlice({
  name: 'url',
  initialState,
  reducers: {
    setUrl: (state, action: {
      type: any,
      payload: {
        url: string
      }
    }) => {
      state.url = action.payload.url
    },
    clearUrl: (state) => {
      state.url = ""
    },
    setUrlAttributes: (state, action: {
      type: any,
      payload: {
        urlAttributes: any
      }
    }) => {
      state.urlAttributes = action.payload.urlAttributes
    },
    clearUrlAttributes: (state) => {
      state.urlAttributes = ""
    },
    setUrlStatus: (state, action: {
      type: any,
      payload: {
        urlStatus: string
      }
    }) => {
      state.urlStatus = action.payload.urlStatus
    },
    clearUrlStatus: (state) => {
      state.urlStatus = ""
    },
  }
})
