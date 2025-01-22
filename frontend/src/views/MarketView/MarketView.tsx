import React from "react";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import KlineChart from "../../components/KlineChart";
import {
  MarketViewClassName,
  TabListClassName,
  TabClassName,
  TabSelectedClassName
} from "./style";

interface MarketViewProps {
  className?: string;
}

const MarketView: React.FC<MarketViewProps> = ({className}) => {

  return <div className={`${MarketViewClassName} ${className}`}>
    <Tabs defaultIndex={0}>

      <TabList className={TabListClassName}>
        <Tab className={TabClassName} selectedClassName={TabSelectedClassName}>PRICE</Tab>
        <Tab className={TabClassName} selectedClassName={TabSelectedClassName}>FUNDING</Tab>
      </TabList>

      <TabPanel>
        <KlineChart/>
      </TabPanel>
      <TabPanel>
        Funding View -- Coming Soon
      </TabPanel>
    </Tabs>
  </div>
};

export default MarketView;
