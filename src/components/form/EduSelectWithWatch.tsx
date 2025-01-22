import { Form, Select } from "antd";
import { useEffect } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
type ISelectProps = {
  label: string;
  placeholder: string;
  name: string;
  disabled?: boolean;
  mode?: "multiple" | undefined;
  onvalueChange: (value: string) => void;
  options: { value: string; label: string }[] | undefined;
};
function EduSelectWithWatch({
  label,
  placeholder,
  name,
  options,
  disabled,
  mode,
  onvalueChange,
}: ISelectProps) {
  const { control } = useFormContext();
  const inputValue = useWatch({
    control,
    name,
  });
  console.log(inputValue);
  useEffect(() => {
    onvalueChange(inputValue);
  }, [inputValue]);
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Select
            mode={mode ? mode : undefined}
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

export default EduSelectWithWatch;
