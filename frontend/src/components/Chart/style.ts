export const ChartBackgroundColor = "#161514";
export const ChartGreenColor = "#4BC2A3";
export const ChartRedColor = "#E03737";
export const ChartGridLinesColor = "#424242";

export const ChartContainerClassName = "w-full p-6 bg-vest-secondary-background";
export const ChartMenuClassName = "flex flex-row items-start space-x-4 mb-4";
export const ChartClassName = "h-96 max-h-full max-h-[439px]";
export const ChartLoadingClassName = "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10";
export const ChartWrapperClassName = "relative";

export const ChartButtonClassName = (live: boolean) => {
  const base = "bg-transparent px-4 py-1.5 rounded-md border";
  if (!live) {
    return `${base} text-vest-green border-vest-green`;
  } else {
    return `${base} text-vest-red border-vest-red`;
  }
}
