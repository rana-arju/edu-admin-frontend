import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
export type IUser = {
  userId: string;
  role: string;
  iat: number;
  exp: number;
};
type IAuthState = {
  user: null | IUser;
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
export const useCurrentToekn = (state: RootState) => state.auth.token;
export const selectCurrentUser = (state: RootState) => state.auth.user;
export default authSlice.reducer;
