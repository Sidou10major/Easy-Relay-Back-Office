import { ErrorMessage, useField } from "formik";
function FormInput({ type, size, high, placeholder, disabled, ...props }) {
  const [field, meta] = useField(props);
  return (
    <div className="text-Red ">
      <div
        style={{
          width:
            size === "small"
              ? "88px"
              : size === "medium"
              ? "192px"
              : size === "large"
              ? "400px"
              : size === "mid"
              ? "142px"
              : size === "full"
              ? ""
              : "300px",
          height: high ? "120px" : "",
          minWidth:
            size === "small" || size === "medium" || size === "mid"
              ? ""
              : "300px",
          maxWidth: "400px",
        }}
        className="input_wrap"
      >
        <div className="text-xs text-[#707070] font-normal">{placeholder}</div>
        <input
          className={
            size === "small"
              ? "max-w-[70px]"
              : size === "medium"
              ? "max-w-[160px]"
              : size === "large"
              ? "w-[320px]"
              : ""
          }
          disabled={disabled}
          type={type}
          name={field.name}
          placeholder={placeholder + "..."}
          {...field}
          {...props}
        />
      </div>
      <div className="ml-2">
        {meta.touched && meta.error && <ErrorMessage name={field.name} />}
      </div>
    </div>
  );
}

export default FormInput;
