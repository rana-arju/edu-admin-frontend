import { FieldValues, SubmitHandler } from "react-hook-form";
import EduForm from "../../../components/form/EduForm";
import { Button, Col, Flex } from "antd";
import EduSelect from "../../../components/form/EduSelect";
import { semesterName, yearOption } from "../../../constant/semester";
import { monthOption } from "../../../constant/global";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicSemesterSchema } from "../../../schema/academicManagementSchema";
import { toast } from "sonner";
import { useCreateSemesterMutation } from "../../../redux/features/admin/academicManagement.api";
import {  ISingleResponse } from "../../../types/global";

function CreateAcademicSemester() {
  const [createSemester] = useCreateSemesterMutation();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating new semester ....");

    const name = semesterName[Number(data?.semester) - 1]?.label;
    const semesterData = {
      name,
      code: data.semester,
      year: data.year,
      startMonth: data.startMonth,
      endMonth: data.endMonth,
    };

    try {
      // toast.loading("Creating new semester ....");
      const res = (await createSemester(semesterData)) as ISingleResponse;
      console.log(res);

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
          resolver={zodResolver(academicSemesterSchema)}
        >
          <EduSelect
            label="Select Semester Name"
            placeholder="Select Semester Name"
            name="semester"
            options={semesterName}
          />
          <EduSelect
            label="Select year"
            placeholder="Select semester year"
            name="year"
            options={yearOption}
          />
          <EduSelect
            label="Start month"
            placeholder="Select semester start month"
            name="startMonth"
            options={monthOption}
          />
          <EduSelect
            label="End month"
            placeholder="Select semester end month"
            name="endMonth"
            options={monthOption}
          />
          <Button htmlType="submit">Create Semester</Button>
        </EduForm>
      </Col>
    </Flex>
  );
}

export default CreateAcademicSemester;
