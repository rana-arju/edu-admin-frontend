import { FieldValues, SubmitHandler } from "react-hook-form";
import EduForm from "../../../components/form/EduForm";
import { Button, Col, Flex } from "antd";
import EduSelect from "../../../components/form/EduSelect";

import { toast } from "sonner";
import { ISingleResponse } from "../../../types/global";
import EduInput from "../../../components/form/EduInput";
import {
  useCreateCourseMutation,
  useGetAllCourseQuery,
} from "../../../redux/features/admin/courseManagement.api";

function CreateCourse() {
  const [createCourse] = useCreateCourseMutation();

  const { data: courses, isFetching } = useGetAllCourseQuery(undefined);
  if (isFetching) {
    return <p>Loading...</p>;
  }
  const academicCourses = courses?.data?.map((item) => ({
    value: item._id,
    label: item.title,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // const toastId = toast.loading("Creating new semester ....");

    const courseData = {
      ...data,
      credits: Number(data.credits),
      code: Number(data.code),
    };

    console.log(courseData);

    const toastId = toast.loading("New course creating...");
    try {
      const res = (await createCourse(courseData)) as ISingleResponse;
      console.log("res", res);

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
    <Flex justify="center" align="middle">
      <Col span={12}>
        <EduForm onSubmit={onSubmit}>
          <EduInput
            type="text"
            label="Course title"
            placeholder="Enter course title"
            name="title"
          />
          <EduInput
            type="text"
            label="Course prefix"
            placeholder="Enter course prefix"
            name="prefix"
          />
          <EduInput
            type="number"
            label="Course code"
            placeholder="Enter course code"
            name="code"
          />
          <EduInput
            type="number"
            label="Credit"
            placeholder="Enter max credits"
            name="credits"
          />

          <EduSelect
            mode="multiple"
            label="Select preRequisite Courses"
            placeholder="Select preRequisite Courses"
            name="preRequisiteCourses"
            options={academicCourses}
          />

          <Button htmlType="submit">Create course</Button>
        </EduForm>
      </Col>
    </Flex>
  );
}

export default CreateCourse;
