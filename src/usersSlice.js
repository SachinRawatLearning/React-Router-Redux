import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
  },
  reducers: {
    addUsers: (state, action) => {
      state.users.push(...action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addUsers } = usersSlice.actions;

export default usersSlice.reducer;
