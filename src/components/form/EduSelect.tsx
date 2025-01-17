import { Form, Select } from "antd";
import { Controller } from "react-hook-form";
type ISelectProps = {
  label: string;
  placeholder: string;
  name: string;
  disabled?: boolean;
  options: { value: string; label: string }[] | undefined;
};
function EduSelect({
  label,
  placeholder,
  name,
  options,
  disabled,
}: ISelectProps) {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Select
            disabled={disabled}
            {...field}
            defaultValue={options ? options[0].value : undefined}
            style={{ width: "100%" }}
            allowClear
            options={options}
            placeholder={placeholder}
            size="large"
          />
          {error && <p style={{ color: "red" }}>{error.message}</p>}
        </Form.Item>
      )}
    />
  );
}

export default EduSelect;
