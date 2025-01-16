import { Controller } from "react-hook-form";
import { Form, Input } from "antd";
type IInputProps = {
  name: string;
  type: string;
  label?: string;
  placeholder: string
};
function EduInput({ name, type, label, placeholder }: IInputProps) {
  return (
    <div style={{ marginBottom: "10px" }}>
      <Controller
        name={name}
        render={({ field }) => (
          <Form.Item label={label}>
            <Input
              type={type}
              id={name}
              {...field}
              size="large"
              placeholder={placeholder}
            />
          </Form.Item>
        )}
      />
    </div>
  );
}

export default EduInput;
