import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isAuthentication: false,
}

const FAKE_USER = {
    name: 'Sahand Faizi',
    email: 'feiziSahand87@gmail.com',
    password: 123
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        Login: (state, action) => {
            if (action.payload.email == FAKE_USER.email && action.payload.password == FAKE_USER.password) {
                return {
                    user: FAKE_USER,
                    isAuthentication: true
                }
            }
        },
        Logout: (state, action) => {
            return {
                user: null,
                isAuthentication: false
            }
        }
    }
})

export const {Login, Logout} = authSlice.actions

export default authSlice.reducer