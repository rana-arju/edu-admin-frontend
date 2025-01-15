import { BaseQueryApi } from "@reduxjs/toolkit/query";

type IError = {
  data: {
    message: string;
    stack?: string;
    success: boolean;
    errorSources: string[];
  };
  status: number;
};
type IMeta = {
  limit: number;
  page: number;
  total: number;
  totalPage: number;
};
export type IResponse<T>= {
  data: T;
  message: string;
  success: boolean;
  meta?: IMeta;
  error?: IError;
};
export type ISingleResponse = {
  data?: {
    data: any;
    message: string;
    success: string
  }
  error?: IError
}
export type IResponseRedux<T> = IResponse<T> & BaseQueryApi;
export type IQueryParam = {
  name: string,
  value: boolean | React.Key
}