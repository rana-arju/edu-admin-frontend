import { Button, Form, Input } from "antd";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { useAppDispatch } from "../../redux/hook";
import { IUser, setUser } from "../../redux/features/auth/authSlice";
import { verifyToekn } from "../../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import EduForm from "../../components/form/EduForm";
import EduInput from "../../components/form/EduInput";

function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();

  const onFinish = async (values) => {
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
    <div className="flex">
      <EduForm onSubmit={onsubmit}>
        <label htmlFor="id">Id</label>
        <EduInput name="id" type="text" />  
        
         <label htmlFor="password">Password</label>
        <EduInput name="password" type="password" />

        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </EduForm>
    </div>
  );
}

export default Login;
