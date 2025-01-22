import { Button, Row } from "antd";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { useAppDispatch } from "../../redux/hook";
import { IUser, setUser } from "../../redux/features/auth/authSlice";
import { verifyToekn } from "../../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import EduForm from "../../components/form/EduForm";
import EduInput from "../../components/form/EduInput";
import { FieldValues } from "react-hook-form";

function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();
  const defaultValues = {
    id: "F-0001",
    password: "faculty12345",
  };
  const onSubmit = async (values: FieldValues) => {
    const userInfo = {
      id: values.id,
      password: values.password,
    };
    const res = await login(userInfo).unwrap();
    const user = verifyToekn(res.data.accessToken) as IUser;
    dispatch(setUser({ user: user, token: res.data.accessToken }));
    toast.success("You are successfully login!");
    if (res.data.needsPasswordChange) {
      return navigate("/change-password");
    } else {
      navigate(`/${user.role}/dashboard`);
    }
  };

  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <EduForm onSubmit={onSubmit} defaultValues={defaultValues}>
        <EduInput
          name="id"
          type="text"
          label="Enter Id"
          placeholder="Enter user id"
        />

        <EduInput
          name="password"
          type="password"
          label="Password"
          placeholder="Enter your password"
        />

        <Button htmlType="submit">Login</Button>
      </EduForm>
    </Row>
  );
}

export default Login;
