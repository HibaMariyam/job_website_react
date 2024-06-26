import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { axiosClient } from "../../utils/axiosClient"

const initialState = {
    jobList: [],
    status: "idle",
    errorMessage: "",
    selectedJob: null

}

export const getJobList = createAsyncThunk(
    "job/getJobList",
    async ({ token, search }) => { //{token} destructures the token received from job home
        const resp = await axiosClient.get("/job/posts", {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: { search: search }//params means in in url ?search=value
            //so in {search:search} search is the key and search is the value
        })
        return resp.data
    })

export const getJobDetails = createAsyncThunk(
    "job/getJobDetails",
    async ({ token, id }) => { //{token} destructures the token received from job home
        const resp = await axiosClient.get(`/job/posts/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return resp.data
    })
const jobSlice = createSlice({
    name: "job",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getJobList.pending, (state) => {
                state.status = "loading"
            })
            .addCase(getJobList.fulfilled, (state, action) => {
                state.status = "success"
                state.jobList = action.payload
            })
            .addCase(getJobList.rejected, (state, action) => {
                state.status = "failure"
                state.errorMessage = action.error.message
                console.log(action.error.message)



            })
            .addCase(getJobDetails.pending, (state) => {
                state.status = "loading"
            })
            .addCase(getJobDetails.fulfilled, (state, action) => {
                state.status = "success"
                state.selectedJob = action.payload
            })
            .addCase(getJobDetails.rejected, (state, action) => {
                state.status = "failure"
                state.errorMessage = action.error.message
                console.log(action.error.message)
            })
    }
})

export default jobSlice.reducer