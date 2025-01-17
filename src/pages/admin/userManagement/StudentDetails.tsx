import { useParams } from "react-router-dom"

function StudentDetails() {
    const param = useParams();
    
    
  return <div>StudentDetails of ====  {param.studentId}</div>;
}

export default StudentDetails