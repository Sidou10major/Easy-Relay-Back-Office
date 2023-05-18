import React from "react";
import Radio from "@mui/material/Radio";
import { ErrorMessage, useField } from "formik";
function RadioButton({ id, checked, disabled, value, ...props }) {
  const [field, meta] = useField(props);
  return (
    <div className="text-Red flex flex-row gap-0 justify-start items-center">
      {meta.touched && meta.error && <ErrorMessage name={field.name} />}
      <Radio
        id={id}
        name={field.name}
        disabled={disabled}
        value={value}
        size="small"
        sx={{
          color: "#000000",
          "&.Mui-checked": {
            color: "#3F0291",
          },
        }}
      />
    </div>
  );
}

export default RadioButton;
