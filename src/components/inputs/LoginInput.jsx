import { ErrorMessage, useField } from "formik";
import Masked from "../../svgs/Masked";
import Shown from "../../svgs/Shown";

function LoginInput({
  type,
  placeholder,
  disabled,
  password,
  setPasswordType,
  ...props
}) {
  const [field, meta] = useField(props);
  return (
    <div>
      <div
        className={
          password
            ? "flex flex-row justify-between items-center login_input"
            : "login_input"
        }
      >
        <input
          disabled={disabled}
          type={type}
          name={field.name}
          placeholder={placeholder}
          {...field}
          {...props}
        />
        {password && type === "password" && (
          <i
            className="transform scale-75 cursor-pointer"
            onClick={() => {
              setPasswordType("text");
            }}
          >
            <Shown />
          </i>
        )}
        {password && type === "text" && (
          <i
            className="transform scale-75 cursor-pointer"
            onClick={() => {
              setPasswordType("password");
            }}
          >
            <Masked />
          </i>
        )}
      </div>
      {meta.touched && meta.error && (
        <div className="text-xs text-red-500 my-1 text-left px-2">
          <ErrorMessage name={field.name} />
        </div>
      )}
    </div>
  );
}

export default LoginInput;
