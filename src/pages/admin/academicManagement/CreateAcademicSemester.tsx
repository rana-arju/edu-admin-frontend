import { FieldValues, SubmitHandler } from "react-hook-form";
import EduForm from "../../../components/form/EduForm";
import { Button, Col, Flex } from "antd";
import EduSelect from "../../../components/form/EduSelect";
import { semesterName, yearOption } from "../../../constant/semester";
import { monthOption } from "../../../constant/global";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { academicSemesterSchema } from "../../../schema/academicManagementSchema";

function CreateAcademicSemester() {
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const name = semesterName[Number(data?.semester) - 1]?.label;
    const semesterData = {
      name,
      code: data.semester,
      year: data.year,
      startMonth: data.startMonth,
      endMonth: data.endMonth,
    };
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
