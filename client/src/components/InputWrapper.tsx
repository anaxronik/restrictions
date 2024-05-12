import { useId } from "react";

type Props = {
  label?: React.ReactNode;
  children: React.ReactNode;
};

const InputWrapper = (props: Props) => {
  const id = useId();
  return (
    <span className="p-float-label w-full">
      {props.children}
      {props.label && <label htmlFor="ac">{props.label}</label>}
    </span>
  );
};

export default InputWrapper;
