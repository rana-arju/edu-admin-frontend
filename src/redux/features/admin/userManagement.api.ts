import { IQueryParam, IResponseRedux } from "../../../types";
import { IAdmin, IFaculty, IStudent } from "../../../types/userManagement.type";
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
    getSingleStudent: builder.query({
      query: (args) => {
        return {
          url: `/students/${args}`,
          method: "GET",
        };
      },
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
    getAllFaculty: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: IQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/faculties",
          method: "GET",
          params,
        };
      },
      transformResponse: (response: IResponseRedux<IFaculty[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    createAdmin: builder.mutation({
      query: (body) => ({
        url: "/users/create-admin",
        method: "POST",
        body,
      }),
    }),
    statusUpdate: builder.mutation({
      query: (body) => {

        return {
          url: `/users/change-status/${body.id}`,
          method: "POST",
          body: {status: body.data},
        };
      },
    }),
    getAllAdmin: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: IQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/admin",
          method: "GET",
          params,
        };
      },
      transformResponse: (response: IResponseRedux<IAdmin[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
  }),
});

export const {
  useCreateStudentMutation,
  useGetAllStudentQuery,
  useCreateAdminMutation,
  useCreateFacultyMutation,
  useGetAllFacultyQuery,
  useGetAllAdminQuery,
  useGetSingleStudentQuery,
  useStatusUpdateMutation,
} = userManagementApi;
