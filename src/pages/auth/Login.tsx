import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { useAppDispatch } from "../../redux/hook";
import { setUser } from "../../redux/features/auth/authSlice";
import { verifyToekn } from "../../utils/verifyToken";
function Login() {
  const dispatch = useAppDispatch()
  const [login] = useLoginMutation();

  type FieldType = {
    id?: string;
    password?: string;
    remember?: string;
  };

  const onFinish: FormProps<FieldType>["onFinish"] = async(values) => {
    const userInfo = {
      id: values.id,
      password: values.password,
    };
    const res = await login(userInfo).unwrap();
    const user = verifyToekn(res.data.accessToken);
    console.log(user);
    
    dispatch(setUser({ user: user, token: res.data.accessToken }));
    
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="flex">
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="User Id"
          name="id"
          rules={[{ required: true, message: "Please input your id!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Login;
