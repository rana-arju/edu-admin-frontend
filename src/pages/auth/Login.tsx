import { Button,Row } from "antd";
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
  id: "A-0001",
  password: "admin123"
}
  const onSubmit = async (values: FieldValues) => {
    const userInfo = {
      id: values.id,
      password: values.password,
    };
    const res = await login(userInfo).unwrap();
    const user = verifyToekn(res.data.accessToken) as IUser;
    dispatch(setUser({ user: user, token: res.data.accessToken }));
    toast.success("You are successfully login!");
    navigate(`/admin/dashboard`);
  };

  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <EduForm onSubmit={onSubmit} defaultValues={defaultValues}>
        <EduInput name="id" type="text" label="Id" />

        <EduInput name="password" type="password" label="Password" />

        <Button htmlType="submit">Submit</Button>
      </EduForm>
    </Row>
  );
}

export default Login;
