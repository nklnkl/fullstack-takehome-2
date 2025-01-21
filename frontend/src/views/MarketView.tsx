import React from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import KlineChart from "../components/KlineChart";

const MarketViewClassName = "";
const TabListClassName = "flex flex-row items-start space-x-4 border-b border-vest-border mb-2.5"
const TabClassName = "w-fit px-4 py-3 text-sm text-vest-grey outline-none";
const TabSelectedClassName = TabClassName + " text-vest-red border-b-2 border-vest-red outline-none";

interface MarketViewProps {
  className?: string;
}

const MarketView: React.FC<MarketViewProps> = ({ className }) => {

  return <div className={`${MarketViewClassName} ${className}`}>
    <Tabs defaultIndex={0}>

        <TabList className={TabListClassName}>
            <Tab className={TabClassName} selectedClassName={TabSelectedClassName}>PRICE</Tab>
            <Tab className={TabClassName} selectedClassName={TabSelectedClassName}>FUNDING</Tab>
        </TabList>

        <TabPanel>
            <KlineChart symbol1="ETH" symbol2="PERP"/>
        </TabPanel>
        <TabPanel>
            Funding View -- Coming Soon
        </TabPanel>
    </Tabs>
  </div>
};

export default MarketView;
