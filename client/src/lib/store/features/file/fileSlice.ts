import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  file: File,
  fileAttributes: {},
  fileStatus: "",
  fileAnalysisUrl: "",
}

export const fileSlice = createSlice({
  name: 'file',
  initialState,
  reducers: {
    setFile: (state, action: {
      type: any,
      payload: any
    }) => {
      state.file = action.payload
    },
    clearFile: (state) => {
      state.file = File
    },
    setFileAttributes: (state, action: {
      type: any,
      payload: any
    }) => {
      state.fileAttributes = action.payload
    },
    clearFileAttributes: (state) => {
      state.fileAttributes = {}
    },
    setFileStatus: (state, action: {
      type: any,
      payload: string
    }) => {
      state.fileStatus = action.payload
    },
    clearFileStatus: (state) => {
      state.fileStatus = ""
    },
    setFileAnalysisUrl: (state, action: {
      type: any,
      payload: string
    }) => {
      state.fileAnalysisUrl = action.payload
    },
    clearFileAnalysisUrl: (state) => {
      state.fileAnalysisUrl = ""
    }
  }
})

export const { setFile, setFileAttributes, setFileStatus, setFileAnalysisUrl, clearFile, clearFileAttributes, clearFileStatus, clearFileAnalysisUrl } = fileSlice.actions;

export default fileSlice.reducer;