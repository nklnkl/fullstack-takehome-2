export const DropdownBackgroundColor = "#1A1A1A";
export const DropdownTextColor = "#AEADAD";
export const ChartMenuSelectSymbolClassName = "w-full bg-vest-border rounded";
export const ChartMenuSelectStyles = {
  control: (base: any) => ({
    ...base,
    backgroundColor: DropdownBackgroundColor,
    border: "transparent",
    textAlign: "left",
  }),
  menu: (base: any) => ({
    ...base,
    zIndex: 9999,
    backgroundColor: DropdownBackgroundColor,
    textAlign: "left",
  }),
  singleValue: (base: any) => ({
    ...base,
    color: DropdownTextColor,
    textAlign: "left",
  }),
  option: (base: any) => ({
    ...base,
    color: DropdownTextColor,
    backgroundColor: DropdownBackgroundColor,
  }),
};