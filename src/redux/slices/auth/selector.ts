import {createSelector} from '@reduxjs/toolkit'
import type {RootState} from '@/redux/store'

export const selectAuth = (state: RootState) => state.auth
export const selectMe = createSelector(selectAuth, s => s.me)
