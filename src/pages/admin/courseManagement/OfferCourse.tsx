import { Button, Col, Flex } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import moment from "moment";
import EduForm from "../../../components/form/EduForm";
import EduSelect from "../../../components/form/EduSelect";
import EduSelectWithWatch from "../../../components/form/EduSelectWithWatch";
import EduInput from "../../../components/form/EduInput";
import EduTimePicker from "../../../components/form/EduTimePicker";
import { weekDaysOptions } from "../../../constant/global";
import {
  useCreateOfferedCourseMutation,
  useGetAllCourseQuery,
  useGetCourseFacultiesQuery,
  useGetRegisteredSemesterQuery,
} from "../../../redux/features/admin/courseManagement.api";
import {
  useGetAllAcademicDepartmentQuery,
  useGetAllAcademicFacultyQuery,
} from "../../../redux/features/admin/academicManagement.api";
import { ISingleResponse } from "../../../types";
import { toast } from "sonner";

const OfferCourse = () => {
  const [courseId, setCourseId] = useState("");

  const [createOfferedCourse] = useCreateOfferedCourseMutation();

  const { data: semesterRegistrationData } = useGetRegisteredSemesterQuery([
    { name: "sort", value: "year" },
    { name: "status", value: "UPCOMING" },
  ]);

  const { data: academicFacultyData } =
    useGetAllAcademicFacultyQuery(undefined);

  const { data: academicDepartmentData } =
    useGetAllAcademicDepartmentQuery(undefined);

  const { data: coursesData } = useGetAllCourseQuery(undefined);

  const { data: facultiesData, isFetching: fetchingFaculties } =
    useGetCourseFacultiesQuery(courseId, { skip: !courseId });

  const semesterRegistrationOptions = semesterRegistrationData?.data?.map(
    (item) => ({
      value: item._id,
      label: `${item.academicSemester.name} ${item.academicSemester.year}`,
    })
  );

  const academicFacultyOptions = academicFacultyData?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const academicDepartmentOptions = academicDepartmentData?.data?.map(
    (item) => ({
      value: item._id,
      label: item.name,
    })
  );

  const courseOptions = coursesData?.data?.map((item) => ({
    value: item._id,
    label: item.title,
  }));

  const facultiesOptions = facultiesData?.data?.faculties?.map((item: any) => ({
    value: item._id,
    label: item.fullName,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const offeredCourseData = {
      ...data,
      maxCapacity: Number(data.maxCapacity),
      section: Number(data.section),
      startTime: moment(new Date(data.startTime)).format("HH:mm"),
      endTime: moment(new Date(data.endTime)).format("HH:mm"),
    };
    const toastId = toast.loading("New course creating...");
    try {
      const res = (await createOfferedCourse(
        offeredCourseData
      )) as ISingleResponse;
      console.log("res====", res);

      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success(res?.data?.message, { id: toastId });
      }
    } catch (error) {
      toast.error("Something went wrong!", { id: toastId });
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={12}>
        <EduForm onSubmit={onSubmit}>
          <EduSelect
            name="semesterRegistration"
            label="Semester Registrations"
            options={semesterRegistrationOptions}
            placeholder="Select Semester Registration"
          />
          <EduSelect
            name="academicFaculty"
            label="Academic Faculty"
            options={academicFacultyOptions}
            placeholder="Select Academic Faculty"
          />
          <EduSelect
            name="academicDepartment"
            label="Academic Department"
            options={academicDepartmentOptions}
            placeholder="Select Academic Department"
          />
          <EduSelectWithWatch
            onvalueChange={setCourseId}
            options={courseOptions}
            name="course"
            label="Course"
            placeholder="Select Course"
          />

          <EduSelect
            disabled={!courseId || fetchingFaculties}
            name="faculty"
            label="Faculty"
            options={facultiesOptions}
            placeholder="Select Faculty"
          />

          <EduInput
            type="text"
            name="section"
            label="Section"
            placeholder="Enter Section"
          />
          <EduInput
            type="text"
            name="maxCapacity"
            label="Max Capacity"
            placeholder="Max capacity"
          />
          <EduSelect
            mode="multiple"
            options={weekDaysOptions}
            name="days"
            label="Days"
            placeholder="Select Days"
          />
          <EduTimePicker name="startTime" label="Start Time" />
          <EduTimePicker name="endTime" label="End Time" />
          <Button htmlType="submit">Submit</Button>
        </EduForm>
      </Col>
    </Flex>
  );
};

export default OfferCourse;
