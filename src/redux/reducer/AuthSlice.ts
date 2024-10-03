import { createSlice } from '@reduxjs/toolkit'
import { ISignClient } from '@walletconnect/types'

interface AuthState {
  isLoggedIn: boolean
  signClient: ISignClient | null
}

export const AuthSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
    signClient: null,
  } satisfies AuthState as AuthState,
  reducers: {
    connect: (state, action) => {
      state.signClient = action.payload.signClient
    },
    login: (state) => {
      state.isLoggedIn = true
      localStorage.setItem('isLoggedIn', 'true')
    },
    logout: (state) => {
      state.isLoggedIn = false
      localStorage.setItem('isLoggedIn', 'false')
    },
  },
})

// Action creators are generated for each case reducer function
export const { connect, login, logout } = AuthSlice.actions

export default AuthSlice.reducer
