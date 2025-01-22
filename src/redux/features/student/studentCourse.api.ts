import { IQueryParam, IResponseRedux } from "../../../types";
import { IOfferedCourse } from "../../../types/courseManagement.type";
import { baseApi } from "../../api/baseApi";

const studentCourseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOfferedCourses: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: IQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/offered-course/my-offered-courses",
          method: "GET",
          params,
        };
      },
      providesTags: ["offeredCourse"],
      transformResponse: (response: IResponseRedux<IOfferedCourse[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    enrolledCourse: builder.mutation({
      query: (body) => {
        return {
          url: `/enrolled-course/create-enrolled-course`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["offeredCourse"],
    }),
    myEnrolledCourses: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: IQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/enrolled-course/my-enrolled-course",
          method: "GET",
        };
      },
      providesTags: ["offeredCourse"],
      transformResponse: (response: IResponseRedux<any>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
  }),
});

export const {
  useGetOfferedCoursesQuery,
  useEnrolledCourseMutation,
  useMyEnrolledCoursesQuery,
} = studentCourseApi;
