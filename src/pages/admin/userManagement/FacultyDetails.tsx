import { useParams } from "react-router-dom";

function FacultyDetails() {
    const param = useParams()
  return <div>FacultyDetails ==== {param.facultyId}</div>;
}

export default FacultyDetails;
