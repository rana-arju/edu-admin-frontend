import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import EduForm from "../../../components/form/EduForm";
import EduInput from "../../../components/form/EduInput";
import { Button, Col, Divider, Form, Input, Row } from "antd";
import EduSelect from "../../../components/form/EduSelect";
import { bloodGroups } from "../../../constant/admin.user";
import EduDatePicker from "../../../components/form/EduDatePicker";
import {
  useGetAllAcademicDepartmentQuery,
  useGetAllSemestersQuery,
} from "../../../redux/features/admin/academicManagement.api";
import { useCreateStudentMutation } from "../../../redux/features/admin/userManagement.api";
import { toast } from "sonner";

function CreateStudent() {
  const [createStudent, { data: response }] = useCreateStudentMutation();

  const {
    data: departments,
    isFetching,
    isLoading,
  } = useGetAllAcademicDepartmentQuery(undefined);
  const {
    data: semesters,
    isFetching: semIsFactching,
    isLoading: semIsLoading,
  } = useGetAllSemestersQuery(undefined);

  const departmentOption =
    departments?.data.map((item) => ({
      value: item._id,
      label: item.name,
    })) || [];
  const semesterOption =
    semesters?.data.map((item) => ({
      value: item._id,
      label: `${item.name}-(${item.year})`,
    })) || [];
  if (isFetching || semIsFactching) {
    return <p>Loading...</p>;
  }
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    try {

      const studentData = {
        password: "r@n@&@rju",
        student: data,
      };
      const formData = new FormData();
      formData.append("data", JSON.stringify(studentData));
      formData.append("file", data.profileImg);
     createStudent(formData);
      if (response) {
        toast.success("Create student successfull");
      } else {
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
 
  const defaultValues = {
    name: {
      firstName: "Mohammad",
      middleName: "Rana",
      lastName: "Arju",
    },
    email: "arju5@gmail.com",
    gender: "male",

    contactNo: "123-456-7890",
    emergencyContactNo: "098-765-4321",
    blood: "O+",
    presentAddress: "123 Main St, Springfield",
    parmanentAddress: "456 Elm St, Springfield",
    guardian: {
      fatherName: "Robert Doe",
      fatherOccupation: "Engineer",
      fatherContactNo: "987-654-3210",
      motherName: "Jane Doe",
      motherOccupation: "Teacher",
      motherContactNo: "876-543-2109",
    },
    localGuardian: {
      name: "Uncle Sam",
      occupation: "Businessman",
      contactNo: "555-555-5555",
      address: "789 Oak St, Springfield",
    },
    admissionSemester: "676ebff70f5ceaba5c40ff05",
    academicDepartment: "676ebc7d3b786a0db17dbb2a",
  };
  //const [createSudent] = useCreateStudentMutation(studentData);

  return (
    <Row>
      <Col span={24}>
        <EduForm onSubmit={onSubmit} defaultValues={defaultValues}>
          <Divider>Personal Info.</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <EduInput
                type="text"
                name="name.firstName"
                label="Enter First Name"
                placeholder="Enter your first name"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <EduInput
                type="text"
                name="name.middleName"
                label="Enter Middle Name"
                placeholder="Enter your first name"
              />
            </Col>

            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <EduInput
                type="text"
                name="name.lastName"
                label="Enter Last Name"
                placeholder="Enter your first name"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <EduSelect
                name="gender"
                label="Select your gender"
                placeholder="Select your gender"
                disabled={false}
                options={[
                  { value: "male", label: "Male" },
                  { value: "female", label: "Female" },
                  { value: "other", label: "Other" },
                ]}
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <EduSelect
                disabled={false}
                name="blood"
                label="Select your blood group"
                placeholder="Select your blood group"
                options={bloodGroups}
              />
            </Col>

            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <EduDatePicker
                name="dateOfBirth"
                placeholder="Select date of birth"
                label="Select date of birth"
              />
            </Col>
            <Col span={24}>
              <Controller
                name="profileImg"
                render={({ field: { onChange, value, ...field } }) => (
                  <Form.Item label="Add profile picture">
                    <Input
                      type="file"
                      value={value?.fileName}
                      placeholder="Add profile photo"
                      {...field}
                      onChange={(e) => onChange(e?.target?.files?.[0])}
                    />
                  </Form.Item>
                )}
              />
            </Col>
          </Row>
          <Divider>Contact Info.</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <EduInput
                type="email"
                name="email"
                label="Email"
                placeholder="Enter your email"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <EduInput
                type="text"
                name="contactNo"
                label="Contact"
                placeholder="Enter contact number"
              />
            </Col>

            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <EduInput
                type="text"
                name="emergencyContactNo"
                label="Emergency Contact"
                placeholder="Enter emergency Contact"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <EduInput
                type="text"
                name="presentAddress"
                label="Present Address"
                placeholder="Enter present address"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <EduInput
                type="text"
                name="parmanentAddress"
                label="Enter parmanent address"
                placeholder="Enter parmanent address"
              />
            </Col>
          </Row>
          <Divider>Guardian</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <EduInput
                type="text"
                name="guardian.fatherName"
                label="Father name"
                placeholder="Enter father name"
              />
            </Col>

            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <EduInput
                type="text"
                name="guardian.fatherOccupation"
                label="Father occupation"
                placeholder="Enter father occupation"
              />
            </Col>

            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <EduInput
                type="text"
                name="guardian.fatherContactNo"
                label="Father Contact"
                placeholder="Enter father Contact"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <EduInput
                type="text"
                name="guardian.motherName"
                label="Mother name"
                placeholder="Enter mother name"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <EduInput
                type="text"
                name="guardian.motherOccupation"
                label="Enter mother occupation"
                placeholder="Enter mother occupation"
              />
            </Col>

            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <EduInput
                type="text"
                name="guardian.motherContactNo"
                label="Enter mother contact"
                placeholder="Enter mother contact"
              />
            </Col>
          </Row>
          <Divider>Local Guardian</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <EduInput
                type="text"
                name="localGuardian.name"
                label="Name"
                placeholder="Enter  name"
              />
            </Col>

            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <EduInput
                type="text"
                name="localGuardian.occupation"
                label="Occupation"
                placeholder="Enter  occupation"
              />
            </Col>

            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <EduInput
                type="text"
                name="localGuardian.contactNo"
                label="Contact"
                placeholder="Enter Contact No"
              />
            </Col>

            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <EduInput
                type="text"
                name="localGuardian.address"
                label="Enter address"
                placeholder="Enter address"
              />
            </Col>
          </Row>
          <Divider>Academic info.</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
              <EduSelect
                disabled={isLoading}
                label="Select academic department"
                placeholder="Select academic department"
                name="academicDepartment"
                options={departmentOption}
              />
            </Col>

            <Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
              <EduSelect
                name="admissionSemester"
                label="Admission Semester"
                placeholder="Enter admission semester"
                options={semesterOption}
                disabled={semIsLoading}
              />
            </Col>
          </Row>
          <Button htmlType="submit">Create Student</Button>
        </EduForm>
      </Col>
    </Row>
  );
}

export default CreateStudent;
