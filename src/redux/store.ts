import {configureStore} from '@reduxjs/toolkit'
import type * as rtk from "@reduxjs/toolkit";
import {setupListeners} from '@reduxjs/toolkit/query/react'
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'
import {baseAPI} from './baseApi'

import authSliceReducer, {authSlice} from './slices/auth'

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat(baseAPI.middleware),
  reducer: {
    [baseAPI.reducerPath]: baseAPI.reducer,
    [authSlice.name]: authSliceReducer
  }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export const useTypedDispatch = () => useDispatch<AppDispatch>()
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector

setupListeners(store.dispatch)
