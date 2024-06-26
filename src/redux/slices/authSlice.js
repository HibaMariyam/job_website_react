import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { axiosClient } from "../../utils/axiosClient"

const initialState = {
    user: null,
    status: 'idle', //"idle" | "loading" | "succeeded" | "failed"
}

export const loginWithEmailPassword =

    createAsyncThunk(
        "auth/loginWithEmailPassword",
        async (data, { rejectWithValue }) => {
            try {
                const resp = await axiosClient.post('/user/login/', data)
                return resp.data
            } catch (error) {
                console.log(error)
                return rejectWithValue(error.response?.data?.errors ?? "Login Failed")
                //This operator?? provides a way to specify a default value when the result of the expression on its left-hand side is null or undefined
            }
        }
    )

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logOut: (state) => {
            state.user = null
            localStorage.removeItem("user")
        },
        loadUser: (state) => {

            const user = JSON.parse(localStorage.getItem("user"))
            if (user) {
                state.user = user
            }
            state.status = "success"
        }

    },
    extraReducers: (builder) => {

        builder.addCase(loginWithEmailPassword.fulfilled, (state, action) => {
            state.status = "success"
            state.user = action.payload
            localStorage.setItem("user", JSON.stringify(action.payload))
            //"user": The key under which the user data will be stored.
            //JSON.stringify(state.action.payload): The payload is converted to a JSON string before storing it. localStorage can only store strings, so JSON.stringify is used to convert JavaScript objects to a string format.
        })
            .addCase(loginWithEmailPassword.rejected, (state, action) => {
                state.status = "failed"
                state.user = action.payload
            })
            .addCase(loginWithEmailPassword.pending, (state) => {
                state.status = 'loading'
            })
    }

})

export default authSlice.reducer

export const { logOut, loadUser } = authSlice.actions

