import { configureStore } from "@reduxjs/toolkit"
import searchReducer from "./slices/searchSlice"
import userReducer from "./slices/userSlice"

const store = configureStore({
    reducer: {
        search: searchReducer,
        user: userReducer
    }
});

export default store;