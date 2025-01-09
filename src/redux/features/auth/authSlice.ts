import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
type IAuthState = {
  user: null | object;
  token: null | string;
};
const initialState: IAuthState = {
  user: null,
  token: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IAuthState>) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});
export const { setUser, logout } = authSlice.actions;
export const useCurrentToekn = (state: RootState) => state.auth.token
export default authSlice.reducer;
