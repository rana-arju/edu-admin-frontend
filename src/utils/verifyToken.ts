import { jwtDecode } from "jwt-decode";

export const verifyToekn = (token: string) => {
  return jwtDecode(token);
};
