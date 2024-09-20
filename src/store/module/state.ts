import { createSlice } from '@reduxjs/toolkit'
import { getModulesPages } from './action'

const initialState = {
  modules: [],
  pages: [],
  isLoading: false
}

const moduleSlice = createSlice({
  name: 'modules',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getModulesPages.pending, state => {
        state.isLoading = true
      })
      .addCase(getModulesPages.fulfilled, (state, action) => {
        state.modules = action.payload.modules
        state.pages = action.payload.pages
        state.isLoading = false
      })
  }
})

export default moduleSlice
