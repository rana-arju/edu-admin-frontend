import { useGetAllSemestersQuery } from "../../redux/features/admin/academicManagement.api";

function AcademicSemester() {
  const { data } = useGetAllSemestersQuery(undefined);
  console.log(data);

  return (
    <div>
      {data?.data?.map((item: any) => (
        <p key={item._id}>{item.name}</p>
      ))}
    </div>
  );
}

export default AcademicSemester;
