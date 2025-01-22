export const DropdownBackgroundColor = "#1A1A1A";
export const ChartMenuSelectSymbolClassName = "w-full bg-vest-border rounded";
export const ChartMenuSelectStyles = {
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