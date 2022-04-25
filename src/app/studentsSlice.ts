import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface studentsState {
   universitiesList: any[],
}

const initialState = {
   universitiesList: [],
} as studentsState

export const studentsSlice = createSlice({
   name: "students",
   initialState,
   reducers: {
      universitiesListSave(state: any, action: PayloadAction<any>) {
         if (action.payload) {
            state.universitiesList = action.payload
         } else {
            state.universitiesList = initialState.universitiesList
         }
      }
   }
})

export const { universitiesListSave } = studentsSlice.actions
export const selectUniversitiesList = (state: RootState) => state.students.universitiesList

export default studentsSlice.reducer