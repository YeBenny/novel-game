import { configureStore } from '@reduxjs/toolkit'

import AuthSlice from './reducer/AuthSlice'
import LocaleSlice from './reducer/LocaleSlice'

export const store = configureStore({
  reducer: {
    auth: AuthSlice,
    locale: LocaleSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActionPaths: ['auth/connect', 'payload.signClient'],
        ignoredPaths: ['auth.signClient'],
      },
    }),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store
