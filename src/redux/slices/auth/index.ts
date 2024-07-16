import {createSlice} from '@reduxjs/toolkit'
import type * as rtk from "@reduxjs/toolkit";
import type {PayloadAction} from '@reduxjs/toolkit'

const initialState: { me: any } = {
  me: {}
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    saveMe: (state, action: PayloadAction<any>) => {
      state.me = action.payload
    }
  }
})

export const {saveMe} = authSlice.actions

export default authSlice.reducer
