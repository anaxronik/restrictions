type Props = {
  field: any;
};

const InputText = (props: Props) => {
  return (
    <div className="flex flex-column gap-2">
      <label htmlFor="username">Username</label>
      <InputText
        id="username"
        aria-describedby="username-help"
        {...props.field}
      />
      <small id="username-help">
        Enter your username to reset your password.
      </small>
    </div>
  );
};

export default InputText;
