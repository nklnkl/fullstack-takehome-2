import React from "react";
import Select from "react-select";

interface ChartDropdownProps {
  options: { value: string, label: string }[];
  onChange: (option: string) => void;
  placeholder?: string;
}

const ChartDropdown: React.FC<ChartDropdownProps> = ({options, onChange, placeholder}) => {
  return <Select
    className={ChartMenuSelectSymbolClassName}
    options={options}
    styles={ChartMenuSelectStyles}
    onChange={(option) => onChange(option?.value ?? "")}
    placeholder={placeholder}
  />
};

const DropdownBackgroundColor = "#1A1A1A";
const ChartMenuSelectSymbolClassName = "w-full bg-vest-border rounded";
const ChartMenuSelectStyles = {
  control: (base: any) => ({
    ...base,
    backgroundColor: DropdownBackgroundColor,
  }),
  menu: (base: any) => ({
    ...base,
    zIndex: 9999,
    backgroundColor: DropdownBackgroundColor,
  }),
  option: (base: any) => ({
    ...base,
    color: "white",
  }),
  singleValue: (base: any) => ({
    ...base,
    color: "white",
  }),
};

export default ChartDropdown;
