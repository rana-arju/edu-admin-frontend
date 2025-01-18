import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import EduForm from "../../../components/form/EduForm";
import EduInput from "../../../components/form/EduInput";
import { Button, Col, Divider, Form, Input, Row } from "antd";
import EduSelect from "../../../components/form/EduSelect";
import { bloodGroups } from "../../../constant/admin.user";
import EduDatePicker from "../../../components/form/EduDatePicker";
import { useGetAllAcademicDepartmentQuery } from "../../../redux/features/admin/academicManagement.api";
import { useCreateFacultyMutation } from "../../../redux/features/admin/userManagement.api";
import { toast } from "sonner";

function CreateFaculty() {
  const [createFaculty, { data: response }] = useCreateFacultyMutation();

  const {
    data: departments,
    isFetching,
    isLoading,
  } = useGetAllAcademicDepartmentQuery(undefined);
  const departmentOption =
    departments?.data.map((item) => ({
      value: item._id,
      label: item.name,
    })) || [];

  if (isFetching) {
    return <p>Loading...</p>;
  }
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    try {
      const facultyData = {
        password: "r@n@&@rju",
        faculty: data,
      };
      const formData = new FormData();
      formData.append("data", JSON.stringify(facultyData));
      formData.append("file", data.profileImg);
      createFaculty(formData);
      console.log("response", response);

      toast.success("Create faculty successfull");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const defaultValues = {
    designation: "Instructor",
    name: {
      firstName: "Rana",
      middleName: "",
      lastName: "Arju",
    },
    gender: "male",
    email: "rana9@gmail.com",
    contactNo: "+1234567890",
    emergencyContactNo: "+0987654321",
    blood: "O+",
    presentAddress: "123 Main Street, Springfield, IL",
    permanentAddress: "456 Elm Street, Springfield, IL",
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
              <EduInput
                type="text"
                name="designation"
                label="Designation"
                placeholder="Enter faculty designation"
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
                name="permanentAddress"
                label="Enter parmanent address"
                placeholder="Enter parmanent address"
              />
            </Col>
          </Row>

          <Button htmlType="submit">Create Faculty</Button>
        </EduForm>
      </Col>
    </Row>
  );
}

export default CreateFaculty;
