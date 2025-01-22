import { IQueryParam, IResponseRedux } from "../../../types";
import {
  ICourses,
  ISemesterRegistered,
} from "../../../types/courseManagement.type";
import { baseApi } from "../../api/baseApi";

const courseManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    semesterRegistration: builder.mutation({
      query: (data) => ({
        url: "/semester-registrations/create-semester-registration",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["semester"],
    }),
    getRegisteredSemester: builder.query({
      query: () => {
        return {
          url: "/semester-registrations",
          method: "GET",
        };
      },
      providesTags: ["semester"],
      transformResponse: (response: IResponseRedux<ISemesterRegistered[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    courseStatusUpdate: builder.mutation({
      query: (body) => {
        return {
          url: `/semester-registrations/${body.id}`,
          method: "PATCH",
          body: { status: body.data },
        };
      },
      invalidatesTags: ["semester"],
    }),
    getAllCourse: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: IQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/courses",
          method: "GET",
        };
      },
      providesTags: ["course"],
      transformResponse: (response: IResponseRedux<ICourses[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    createCourse: builder.mutation({
      query: (body) => {
        return {
          url: `/courses/create-course`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["course"],
    }),
    courseAssignFaculty: builder.mutation({
      query: (body) => {
        return {
          url: `/courses/${body.id}/assign-faculties`,
          method: "PUT",
          body: { faculties: body.faculties },
        };
      },
      invalidatesTags: ["course"],
    }),
    getCourseFaculties: builder.query({
      query: (id) => {
        return {
          url: `/courses/${id}/get-faculties`,
          method: "GET",
        };
      },
      transformResponse: (response: IResponseRedux<any>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    createOfferedCourse: builder.mutation({
      query: (data) => ({
        url: "/offered-course/create-offered-course",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["course"],
    }),
  }),
});

export const {
  useSemesterRegistrationMutation,
  useGetRegisteredSemesterQuery,
  useCourseStatusUpdateMutation,
  useGetAllCourseQuery,
  useCreateCourseMutation,
  useCourseAssignFacultyMutation,
  useGetCourseFacultiesQuery,
  useCreateOfferedCourseMutation,
} = courseManagementApi;
