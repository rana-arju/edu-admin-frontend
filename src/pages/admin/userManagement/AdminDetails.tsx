import { useParams } from "react-router-dom"

function AdminDetails() {
    const param = useParams()
  return (
    <div>AdminDetails === {param.adminId}</div>
  )
}

export default AdminDetails