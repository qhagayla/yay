// store.js
import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./auth/authSlice"
import videoReducer from "./video/videoSlice"
import remarkReducer from "./remark/remarkSlice"
import clientReducer from "./client/clientSlice"
import assessmentReducer from "./assessment/assessmentSlice"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        video: videoReducer,
        remark: remarkReducer,  // Add remark reducer
        client: clientReducer,
        assessment: assessmentReducer,
    },
})