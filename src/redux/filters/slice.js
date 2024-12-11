import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    filters:{
        name: "",
      }
}

const filtersSlice = createSlice({
    name:"filters",
    initialState,
    reducers:{
        setNameFilter(state,action){
            state.filters.name = action.payload;
        }
    }

})
export const {setNameFilter} = filtersSlice.actions;
export default filtersSlice.reducer