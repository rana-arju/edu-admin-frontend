import { FieldValues, SubmitHandler } from "react-hook-form";
import EduForm from "../../../components/form/EduForm";
import { Button, Col, Flex } from "antd";
import EduSelect from "../../../components/form/EduSelect";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicDepartmentSchema } from "../../../schema/academicManagementSchema";
import { toast } from "sonner";
import {
  useCreateAcademicDepartmentMutation,
  useGetAllAcademicFacultyQuery,
} from "../../../redux/features/admin/academicManagement.api";
import { ISingleResponse } from "../../../types/global";
import EduInput from "../../../components/form/EduInput";

function CreateAcademicDepartment() {
  const [createAcademicDepartment] = useCreateAcademicDepartmentMutation();
  const {
    data: faculties,
    isFetching,
    isLoading,
  } = useGetAllAcademicFacultyQuery(undefined);
  const facultyOption = faculties?.data.map((item) => ({
    value: item._id,
    label: item.name,
  })) || [];
  if (isFetching || isLoading) {
    return <p>Loadding...</p>;
  }
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating new semester ....");

    const departmentData = {
      name: data.name,
      academicFaculty: data.academicFaculty,
    };

    try {
      // toast.loading("Creating new semester ....");
      const res = (await createAcademicDepartment(
        departmentData
      )) as ISingleResponse;

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
        <EduForm
          onSubmit={onSubmit}
          resolver={zodResolver(academicDepartmentSchema)}
        >
          <EduInput
            label="Enter department Name"
            placeholder="Enter department Name"
            name="name"
            type="text"
          />
          <EduSelect
            label="Select academic faculty"
            placeholder="Select academic faculty"
            name="academicFaculty"
            options={facultyOption}
          />

          <Button htmlType="submit">Create Semester</Button>
        </EduForm>
      </Col>
    </Flex>
  );
}

export default CreateAcademicDepartment;
