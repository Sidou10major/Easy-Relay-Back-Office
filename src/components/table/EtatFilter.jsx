import React from "react";
import Select, { components } from "react-select";
import ArrowDown from "../../svgs/ArrowDown";
import { useMediaQuery } from "react-responsive";
import { EtatOptions } from "../../helpers/LivraisonData";
function EtatFilter({ currentEtat, setEtatLivraison, length }) {
  const small = useMediaQuery({
    query: "(max-width : 640px)",
  });
  const width = small ? 300 : 220;
  const customStyle = {
    control: (provided, state) => ({
      ...provided,
      border: 0,
      outline: state.isFocused ? "none" : "none",
      width: width,
      height: 44,
      cursor: "pointer",
      borderRadius: 6,
      boxShadow: "none",
      paddingTop: 0,
      paddingBottom: 0,
      paddingRight: 16,
      paddingLeft: 16,
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
      backgroundColor:
        state.isSelected || state.isActive
          ? "#DFD0F2"
          : state.isFocused
          ? "#F2F2F2"
          : "",
      color: state.isSelected ? "##3F0291" : state.isFocused ? "#000000" : "",
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
        <div className="flex flex-col justify-start">
          <label className=" text-xs text-[#707070] font-normal">Etat</label>
          {children}
        </div>
      </components.ValueContainer>
    );
  };

  const etatInitial = EtatOptions.find((etat) => etat.value === currentEtat);

  return (
    <>
      <Select
        options={EtatOptions}
        styles={customStyle}
        components={{
          ValueContainer,
          DropdownIndicator,
          IndicatorSeparator: () => null,
        }}
        isSearchable={false}
        noOptionsMessage={() => "Pas d'options"}
        value={{
          value: etatInitial.value,
          label: etatInitial.label + " (" + length + ")",
        }}
        onChange={(selected) => setEtatLivraison(selected.value)}
      />
    </>
  );
}

export default EtatFilter;
