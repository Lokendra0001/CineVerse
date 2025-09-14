import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: "search",
    initialState: {
        searchedVal: null,
    },
    reducers: {
        addVal: (state, action) => {
            state.searchedVal = action.payload
        },
        removeVal: (state) => {
            state.searchedVal = null
        }
    }
})

export const { addVal, removeVal } = searchSlice.actions;
export default searchSlice.reducer