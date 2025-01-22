import React from "react";
import {
  HeadlineClassName,
} from "./style";
import HeadlineItem from "./HeadlineItem";

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

export default Headline;
