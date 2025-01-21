import { FieldValues, SubmitHandler } from "react-hook-form";
import EduForm from "../../../components/form/EduForm";
import { Button, Col, Flex } from "antd";
import EduSelect from "../../../components/form/EduSelect";
import { semesterStatusOptions } from "../../../constant/semester";

import { toast } from "sonner";
import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api";
import { ISingleResponse } from "../../../types/global";
import EduDatePicker from "../../../components/form/EduDatePicker";
import EduInput from "../../../components/form/EduInput";
import { useSemesterRegistrationMutation } from "../../../redux/features/admin/courseManagement.api";

function SemesterRegistration() {
  const [semesterRegistration] = useSemesterRegistrationMutation();

  const { data: academicSemesters, isFetching } = useGetAllSemestersQuery([
    { name: "sort", value: "year" },
  ]);
  if (isFetching) {
    return <p>Loading...</p>;
  }
  const academicSemesterOptions = academicSemesters?.data?.map((item) => ({
    value: item._id,
    label: `${item.name}-${item.year}`,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating new semester ....");

    const semesterData = {
      ...data,
      minCredit: Number(data.minCredit),
      maxCredit: Number(data.maxCredit),
    };

    try {
      // toast.loading("New semester registration....");
      const res = (await semesterRegistration(semesterData)) as ISingleResponse;

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
        <EduForm onSubmit={onSubmit}>
          <EduSelect
            label="Select Semester Name"
            placeholder="Select Semester Name"
            name="academicSemester"
            options={academicSemesterOptions}
          />
          <EduSelect
            label="Select Status"
            placeholder="Select semester status"
            name="status"
            options={semesterStatusOptions}
          />
          <EduDatePicker
            label="Start Date"
            placeholder="Select semester start date"
            name="startDate"
          />
          <EduDatePicker
            label="End Date"
            placeholder="Select semester end date"
            name="endDate"
          />
          <EduInput
            type="number"
            label="Min credit"
            placeholder="Enter min credits"
            name="minCredit"
          />
          <EduInput
            type="number"
            label="Max credit"
            placeholder="Enter max credits"
            name="maxCredit"
          />
          <Button htmlType="submit">Semester Registration</Button>
        </EduForm>
      </Col>
    </Flex>
  );
}

export default SemesterRegistration;
