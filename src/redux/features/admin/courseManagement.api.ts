import { IResponseRedux } from "../../../types";
import { ISemesterRegistered } from "../../../types/courseManagement.type";
import { baseApi } from "../../api/baseApi";

const courseManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    semesterRegistration: builder.mutation({
      query: (data) => ({
        url: "/semester-registrations/create-semester-registration",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ['semester']
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
      invalidatesTags: ["semester"]
    }),
  }),
});

export const {useSemesterRegistrationMutation, useGetRegisteredSemesterQuery, useCourseStatusUpdateMutation} = courseManagementApi