import { useState, useRef } from "react";
function EditableCell({
  value: initialValue,
  row: { index },
  column: { id },
  updateData,
}) {
  const inputRef = useRef(null);
  const [value, setValue] = useState(initialValue || "");
  const onChange = (e) => {
    setValue(e.target.value);
  };
  // We'll only update the external data when the input is blurred
  const onBlur = () => {
    updateData(index, id, value);
  };

  return (
    <input
      ref={inputRef}
      name={id + index}
      style={{
        outline: "none",
        border: "none",
        backgroundColor: "transparent",
        width: "fit-content",
        maxWidth: "70px",
      }}
      placeholder="Ecriver ici"
      value={value}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
}

export default EditableCell;
