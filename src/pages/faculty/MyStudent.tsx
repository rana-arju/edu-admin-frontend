import { useParams } from "react-router-dom";
import {
  useAddMarkMutation,
  useGetAllFacultyEnrolledCourseQuery,
} from "../../redux/features/faculty/facultyManagement.api";
import { Button, Modal, Table } from "antd";
import { toast } from "sonner";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import EduInput from "../../components/form/EduInput";
import EduForm from "../../components/form/EduForm";

const columns = [
  {
    title: "Student Name",
    dataIndex: "name",
    showSorterTooltip: true,
  },

  {
    title: "Roll",
    dataIndex: "roll",
    defaultSortOrder: "descend" as const,
  },

  {
    title: "Actions",
    key: "X",
    render: (item: any) => {
      return <AddMarksModal studentInfo={item} />;
    },
  },
];
function MyStudent() {
  const { registerSemesterId, courseId } = useParams();

  const { data: enrolledCourses, isFetching } =
    useGetAllFacultyEnrolledCourseQuery([
      {
        name: "semesterRegistration",
        value: registerSemesterId,
      },
      {
        name: "course",
        value: courseId,
      },
    ]);
  const tableData = enrolledCourses?.data?.map(
    ({ _id, student, semesterRegistration, offeredCourse }: any) => ({
      key: _id,
      name: student.fullName,
      roll: student.id,
      semesterRegistration: semesterRegistration._id,
      student: student._id,
      offeredCourse: offeredCourse._id,
    })
  );

  const onChange = (
    _pagination: any,
    _filters: any,
    _sorter: any,
    _extra: any
  ) => {};

  return (
    <Table
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      onChange={onChange}
    />
  );
}
const AddMarksModal = ({ studentInfo }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addMark] = useAddMarkMutation();
  const showModal = () => {
    setIsModalOpen(true);
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const studentMark = {
      semesterRegistration: studentInfo.semesterRegistration,
      offeredCourse: studentInfo.offeredCourse,
      student: studentInfo.student,
      courseMarks: {
        classTest1: Number(data.classTest1),
        midTerm: Number(data.midTerm),
        classTest2: Number(data.classTest2),
        finalTerm: Number(data.finalTerm),
      },
    };

    try {
      const res = await addMark(studentMark);

      toast.success(res.data.message);
    } catch (error) {
      toast.error("Failed to add mark");
    }

    //const toastId = toast.loading("New course creating...");

    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button onClick={showModal}>Add Mark</Button>
      <Modal
        open={isModalOpen}
        onOk={onSubmit}
        onCancel={handleCancel}
        footer={null}
      >
        <EduForm onSubmit={onSubmit}>
          <EduInput
            name="classTest1"
            placeholder="First class test number"
            label="First class test num"
            type="number"
          />
          <EduInput
            name="classTest2"
            placeholder="Second class test number"
            label="Second class test num"
            type="number"
          />
          <EduInput
            name="midTerm"
            placeholder="Mid term test number"
            label="Mid term test num"
            type="number"
          />
          <EduInput
            name="finalTerm"
            placeholder="Final term test number"
            label="Final term test num"
            type="number"
          />
          <Button htmlType="submit">Add marks</Button>
        </EduForm>
      </Modal>
    </>
  );
};
export default MyStudent;
