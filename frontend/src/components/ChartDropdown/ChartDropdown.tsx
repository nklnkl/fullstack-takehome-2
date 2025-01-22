import React from "react";
import Select from "react-select";
import { ChartMenuSelectSymbolClassName, ChartMenuSelectStyles } from "./style";

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

export default ChartDropdown;
