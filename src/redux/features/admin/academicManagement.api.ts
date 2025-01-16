import { IQueryParam, IResponseRedux } from "../../../types";
import { IAcademicDepartment, IAcademicFaculty, IAcademicSemester } from "../../../types/academicManagement.type";
import { baseApi } from "../../api/baseApi";

const academicManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSemesters: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: IQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/academic-semester",
          method: "GET",
          params,
        };
      },
      transformResponse: (response: IResponseRedux<IAcademicSemester[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    createSemester: builder.mutation({
      query: (data) => ({
        url: "/academic-semester/create-academic-semester",
        method: "POST",
        body: data,
      }),
    }),
    createAcademicFaculty: builder.mutation({
      query: (data) => ({
        url: "/academic-faculty/create-academic-faculty",
        method: "POST",
        body: data,
      }),
    }),
    getAllAcademicFaculty: builder.query({
      query: () => {
        return {
          url: "/academic-faculty/get-academic-faculty",
          method: "GET",
        };
      },
      transformResponse: (response: IResponseRedux<IAcademicFaculty[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    createAcademicDepartment: builder.mutation({
      query: (body) => ({
        url: "/academic-department/create-academic-department",
        method: "POST",
        body,
      }),
    }),
    getAllAcademicDepartment: builder.query({
      query: () => {
        return {
          url: "/academic-department/get-academic-department",
          method: "GET",
        };
      },
      transformResponse: (response : IResponseRedux<IAcademicDepartment[]>) => {
        return {
          data: response.data,
          meta: response.meta
        }

      }
    }),
  }),
});

export const { useGetAllSemestersQuery, useCreateSemesterMutation, useCreateAcademicFacultyMutation, useGetAllAcademicFacultyQuery , useCreateAcademicDepartmentMutation, useGetAllAcademicDepartmentQuery} =
  academicManagementApi;
