import { IQueryParam, IResponseRedux } from "../../../types";
import { baseApi } from "../../api/baseApi";

const facultyManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllFacultyEnrolledCourse: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: IQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/enrolled-course",
          method: "GET",
          params,
        };
      },
      // providesTags: ["offeredCourse"],
      transformResponse: (response: IResponseRedux<any>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    addMark: builder.mutation({
      query: (body) => {
        return {
          url: `/enrolled-course/update-enrolled-course-marks`,
          method: "PATCH",
          body,
        };
      },
      invalidatesTags: ["course"],
    }),
  }),
});

export const {
  useGetAllFacultyEnrolledCourseQuery, useAddMarkMutation
} = facultyManagementApi;