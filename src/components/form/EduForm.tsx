import { Form } from "antd";
import { ReactNode } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
type IFormConfig = {
  defaultValues?: Record<string, any>;
  resolver?: any;
};
type IFormProps = {
  onSubmit: SubmitHandler<FieldValues>;
  children: ReactNode;
} & IFormConfig;

function EduForm({ onSubmit, children, defaultValues, resolver }: IFormProps) {
  const formConfig: IFormConfig = {};
  if (defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }
  if (resolver) {
    formConfig["resolver"] = resolver
  }

  const methods = useForm(formConfig);
  return (
    <FormProvider {...methods}>
      <Form layout="vertical" onFinish={methods.handleSubmit(onSubmit)}>
        {children}
      </Form>
    </FormProvider>
  );
}

export default EduForm;
