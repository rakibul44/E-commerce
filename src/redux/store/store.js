import { configureStore } from "@reduxjs/toolkit";
import apiService from "../api-service/api-service";


export const store = configureStore({
    reducer: {
        [apiService.reducerPath]: apiService.reducer, 
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiService.middleware), 
})