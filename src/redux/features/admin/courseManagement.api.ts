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
    }),
    getRegisteredSemester: builder.query({
      query: () => {
        return {
          url: "/semester-registrations",
          method: "GET",
        };
      },
      transformResponse: (response: IResponseRedux<ISemesterRegistered[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
  }),
});

export const {useSemesterRegistrationMutation, useGetRegisteredSemesterQuery} = courseManagementApi