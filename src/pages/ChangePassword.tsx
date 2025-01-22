import { Button, Row } from "antd";
import EduForm from "../components/form/EduForm";
import EduInput from "../components/form/EduInput";
import { FieldValues } from "react-hook-form";
import { usePasswordChangeMutation } from "../redux/features/auth/authApi";
import {  useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/hook";
import { logout } from "../redux/features/auth/authSlice";
import { toast } from "sonner";

function ChangePassword() {
  const [passwordChange] = usePasswordChangeMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const onSubmit = async (values: FieldValues) => {
    const res = await passwordChange(values);

    if (res?.data?.success) {
      dispatch(logout());
      toast.success(res?.data?.message);
      return navigate("/login");
    }
  };
  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <EduForm onSubmit={onSubmit}>
        <EduInput
          name="oldPassword"
          type="password"
          label="Old Password"
          placeholder="Enter your old password"
        />
        <EduInput
          name="newPassword"
          type="password"
          label="New Password"
          placeholder="Enter your new password"
        />

        <Button htmlType="submit">Change Password</Button>
      </EduForm>
    </Row>
  );
}

export default ChangePassword;
