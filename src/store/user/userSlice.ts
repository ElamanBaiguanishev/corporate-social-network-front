import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { IUser } from '../../types/user/user'

interface UserState {
    user: IUser | null,
    isAuth: boolean
}

const initialState: UserState = {
    user: null, isAuth: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload
            state.isAuth = true
        },
        logout: (state) => {
            state.isAuth = false
            state.user = null
        }
    },
})

export const { login, logout } = userSlice.actions

export const selectUser = (state: RootState) => state.user.user

export default userSlice.reducer