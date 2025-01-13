import { useFormContext } from "react-hook-form";

function EduInput({name, type}) {
  const { register } = useFormContext();

  return <input type={type} id={name} {...register(name)} />;
}

export default EduInput;
