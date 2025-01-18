import { useParams } from "react-router-dom";
import { useGetSingleStudentQuery } from "../../../redux/features/admin/userManagement.api";

function StudentDetails() {
  const param = useParams();
  const {
    data: student,
    isFetching,
    isLoading,
  } = useGetSingleStudentQuery(param.studentId);
  if (isFetching || isLoading) {
    return <p>Loading...</p>;
  }
  console.log(student);

  return <div>StudentDetails of ==== {student.data.fullName}</div>;
}

export default StudentDetails;
