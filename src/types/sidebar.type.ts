import { ReactNode } from "react";

export type IUserPaths = {
  name: string;
  path?: string;
  element?: ReactNode;
  children?: IUserPaths[];
};

export type IRoute = {
  path: string;
  element: ReactNode;
};
export type ISidebarItem = {
  key: string;
  label: ReactNode;
  children?: ISidebarItem[];
};
