import Select, { components } from "react-select";
import ArrowDown from "../../svgs/ArrowDown";
import { ErrorMessage, useField } from "formik";
function FormSelect({
  placeholder,
  title,
  width,
  setValue,
  options,
  wilaya,
  wilayaOnly,
  setWilayaId,
  value,
  disabled,
  formik,
  commune,
  ...props
}) {
  const [field, meta] = useField(props);
  const customStyle = {
    control: (provided, state) => ({
      ...provided,
      border: 0,
      outline: state.isFocused ? "none" : "none",
      width: width,
      height: 48,
      cursor: "pointer",
      borderRadius: 6,
      boxShadow: "none",
      paddingTop: 0,
      paddingBottom: 0,
      paddingRight: 8,
      backgroundColor: "#F2F2F2",
      fontWeight: "bold",
    }),
    singleValue: (provided) => ({
      ...provided,
      marginRight: 0,
      marginLeft: 0,
    }),
    menu: (provided) => ({
      ...provided,
      width: width,
      backgroundColor: "#FFFFFF",
      color: "#000000",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#F2F2F2"
        : state.isFocused
        ? "#F2F2F2"
        : state.isActive
        ? "#F2F2F2"
        : "",
      color: state.isSelected ? "#3F0291" : state.isFocused ? "#000000" : "",
    }),
  };
  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <div className="relative top-[-12px] max-h-12">
          <ArrowDown />
        </div>
      </components.DropdownIndicator>
    );
  };
  const ValueContainer = ({ children, ...props }) => {
    return (
      <components.ValueContainer {...props}>
        <div className="flex flex-col justify-start text-black font-normal">
          <label className=" text-xs text-[#707070] font-normal">{title}</label>
          {children}
        </div>
      </components.ValueContainer>
    );
  };

  return (
    <div className="text-Red">
      <Select
        options={options}
        styles={customStyle}
        name={field.name}
        components={{
          ValueContainer,
          DropdownIndicator,
          IndicatorSeparator: () => null,
        }}
        isDisabled={disabled}
        isSearchable={false}
        placeholder={placeholder}
        onChange={(selected) => {
          formik.setFieldValue(field.name, selected.value);
          if (commune || wilayaOnly) {
            setValue(selected.id);
          } else {
            if (wilaya) {
              setValue(selected.id);
              setWilayaId(selected.id);
            } else {
              setValue(selected.value);
            }
          }
        }}
      />
      <div className="ml-2">
        {meta.touched && meta.error && <ErrorMessage name={field.name} />}
      </div>
    </div>
  );
}

export default FormSelect;
