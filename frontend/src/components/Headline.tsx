import React from "react";

const HeadlineClassName = "flex flex-row items-start py-2 border-b border-vest-border";
const HeadlineItemClassName = "flex-1 items-start flex flex-col";
const HeadlineItemLabelClassName = "text-xs text-vest-grey";
const HeadlineItemValueClassName = "text-sm font-bold text-vest-green";

interface HeadlineProps {
  className?: string;
  price: string;
  twentyFourHourChange: string;
  oneHourFunding: string;
  longOpenInterest: string;
  shortOpenInterest: string;
}

const Headline: React.FC<HeadlineProps> = (props) => {
  return <div className={`${HeadlineClassName} ${props.className}`}>
    <HeadlineItem label="BTC / Bitcoin" value="something"/>
    <HeadlineItem label="Price" value={props.price}/>
    <HeadlineItem label="24H Change" value={props.twentyFourHourChange}/>
    <HeadlineItem label="1H Funding" value={props.oneHourFunding}/>
    <HeadlineItem label="Long Open Interest" value={props.longOpenInterest}/>
    <HeadlineItem label="Short Open Interest" value={props.shortOpenInterest}/>
  </div>
};

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

export default Headline;
