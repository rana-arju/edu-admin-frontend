import { IQueryParam, IResponseRedux } from "../../../types";
import { IStudent } from "../../../types/userManagement.type";
import { baseApi } from "../../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createStudent: builder.mutation({
      query: (body) => ({
        url: "/users/create-student",
        method: "POST",
        body,
      }),
    }),
    getAllStudent: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: IQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/students",
          method: "GET",
          params,
        };
      },
      transformResponse: (response: IResponseRedux<IStudent[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    createFaculty: builder.mutation({
      query: (body) => ({
        url: "/users/create-faculty",
        method: "POST",
        body,
      }),
    }),
    createAdmin: builder.mutation({
      query: (body) => ({
        url: "/users/create-admin",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useCreateStudentMutation, useGetAllStudentQuery, useCreateAdminMutation, useCreateFacultyMutation } =
  userManagementApi;
