import { useMemo } from "react";
import Select, { components } from "react-select";
import { formatHeader } from "../../helpers/HelperFunctions";
import ArrowDown from "../../svgs/ArrowDown";
function SelectMulti({
  placeholder,
  title,
  width,
  height,
  options,
  selectedAttributes,
  setSelectedAttributes,
  ...props
}) {
  const initialValues = useMemo(
    () =>
      selectedAttributes
        ? selectedAttributes.map((att) => {
            return { value: att, label: formatHeader(att) };
          })
        : [],
    [selectedAttributes]
  );
  const customStyle = {
    control: (provided, state) => ({
      ...provided,
      border: 0,
      outline: state.isFocused ? "none" : "none",
      width: width,
      height: height,
      cursor: "pointer",
      borderRadius: 6,
      boxShadow: "none",
      paddingTop: 0,
      paddingBottom: 0,
      paddingright: 8,
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
    multiValue: (styles, { data }) => {
      return {
        ...styles,
        backgroundColor: "#FFFFFF",
        color: "rgb(63 2 145 / var(--tw-text-opacity)) !important",
        borderRadius: "16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "between",
        padding: " 0 6px",
        gap: "6px",
        filter: "drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.161));",
      };
    },
    multiValueRemove: (styles, { data }) => ({
      ...styles,
      height: 18,
      width: 18,
      borderRadius: "2999px",
      color: "#FFFFFF",
      backgroundColor: "#3F0291",
      margin: "auto",
      ":hover": {},
    }),
  };
  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <div className="max-h-12">
          <ArrowDown />
        </div>
      </components.DropdownIndicator>
    );
  };
  const ValueContainer = ({ children, ...props }) => {
    return (
      <components.ValueContainer {...props}>
        <div className="flex flex-col gap-1 relative top-[-6px]">
          <label className=" text-xs text-[#707070] font-normal">{title}</label>
          <div className="flex flex-row justify-start gap-2 ">{children}</div>
        </div>
      </components.ValueContainer>
    );
  };
  return (
    <>
      <Select
        options={options}
        styles={customStyle}
        defaultValue={initialValues}
        components={{
          ValueContainer,
          DropdownIndicator,
          IndicatorSeparator: () => null,
        }}
        placeholder={placeholder}
        isMulti
        isSearchable={false}
        onChange={(selected) => {
          setSelectedAttributes(selected.map((selected) => selected.value));
        }}
      />
    </>
  );
}

export default SelectMulti;
