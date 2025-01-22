import { Button, Col, Flex } from "antd";
import EduForm from "../../components/form/EduForm";
import EduSelect from "../../components/form/EduSelect";
import { useGetAllFacultyEnrolledCourseQuery } from "../../redux/features/faculty/facultyManagement.api";
import { useNavigate } from "react-router-dom";
import { FieldValues, SubmitHandler } from "react-hook-form";

function MyCourses() {
  const navigate = useNavigate();
  const { data: enrolledCourses } =
    useGetAllFacultyEnrolledCourseQuery(undefined);
  const semesterOption = enrolledCourses?.data?.map((item: any) => ({
    value: item?.semesterRegistration?._id,
    label: `${item.academicSemester.name} ${item.academicSemester.year}`,
  }));
  const courseOption = enrolledCourses?.data?.map((item: any) => ({
    value: item.course._id,
    label: `${item.course.title}`,
  }));
  console.log(enrolledCourses);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    navigate(`/faculty/courses/${data.semesterRegistration}/${data.course}`);
  };
  return (
    <Flex justify="center" align="center">
      <Col span={12}>
        <EduForm onSubmit={onSubmit}>
          <EduSelect
            options={semesterOption}
            label="Select Semester Registration"
            name="semesterRegistration"
            placeholder="Select Semester Registration"
          />
          <EduSelect
            options={courseOption}
            label="Select course"
            name="course"
            placeholder="Select course"
          />
          <Button htmlType="submit">Submit</Button>
        </EduForm>
      </Col>
    </Flex>
  );
}

export default MyCourses;
