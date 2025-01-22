import React from "react";
import {
  HeadlineItemClassName,
  HeadlineItemLabelClassName,
  HeadlineItemValueClassName,
} from "./style";

interface HeadlineItemProps {
  className?: string;
  label: string;
  value: string;
}

const HeadlineItem: React.FC<HeadlineItemProps> = ({className, label, value}) => {
  return <div className={`${HeadlineItemClassName} ${className}`}>
    <div className={HeadlineItemLabelClassName}>{label}</div>
    <div className={HeadlineItemValueClassName}>{value}</div>
  </div>
};

export default HeadlineItem;
