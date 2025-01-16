import { Form, Select } from "antd";
import { Controller } from "react-hook-form";
type ISelectProps = {
  label: string;
  placeholder: string;
  name: string;
  options: { value: string; label: string }[];
};
function EduSelect({ label, placeholder, name, options }: ISelectProps) {
  

  return (
    <Controller
      name={name}
      render={({ field, fieldState: {error} }) => (
        <Form.Item label={label}>
          <Select
            {...field}
            
          defaultValue={options[0].value}
            
            style={{ width: "100%" }}
            allowClear
            options={options}
            placeholder={placeholder}
            size="large"
          />
        {
          error && <p style={{color: "red"}}>{error.message}</p>
        }
        </Form.Item>
      )}
    />
  );
}

export default EduSelect;
