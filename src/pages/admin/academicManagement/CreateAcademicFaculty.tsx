import { FieldValues, SubmitHandler } from "react-hook-form";
import EduForm from "../../../components/form/EduForm";
import { Button, Col, Flex } from "antd";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicFacultySchema } from "../../../schema/academicManagementSchema";
import { toast } from "sonner";
import { useCreateAcademicFacultyMutation } from "../../../redux/features/admin/academicManagement.api";
import { ISingleResponse } from "../../../types/global";
import EduInput from "../../../components/form/EduInput";

function CreateAcademicFaculty() {
  const [createAcademicFaculty] = useCreateAcademicFacultyMutation();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    
    const toastId = toast.loading("Creating new faculty ....");

    try {
      // toast.loading("Creating new semester ....");
      const res = (await createAcademicFaculty({
        name: data.name,
      })) as ISingleResponse;

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
      <Col span={6}>
        <EduForm
          onSubmit={onSubmit}
          resolver={zodResolver(academicFacultySchema)}
        >
          <EduInput
            label="Academic Faculty Name"
            placeholder="Academic Faculty Name"
            name="name"
            type="text"
          />

          <Button htmlType="submit">create faculty</Button>
        </EduForm>
      </Col>
    </Flex>
  );
}

export default CreateAcademicFaculty;
