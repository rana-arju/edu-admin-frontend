import { DatePicker,Form } from "antd";
import { Controller } from "react-hook-form";
type IDateProps = {
  label: string;
  placeholder: string;
  name: string;
};

function EduDatePicker({ label, placeholder,name }: IDateProps) {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <DatePicker
            {...field}
            size="large"
            style={{width: "100%"}}
            placeholder={placeholder}
          />

          {error && <p style={{ color: "red" }}>{error.message}</p>}
        </Form.Item>
      )}
    />
  );
}

export default EduDatePicker;
