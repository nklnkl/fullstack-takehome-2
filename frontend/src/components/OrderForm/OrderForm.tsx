import React from "react";
import {Tabs, TabList, Tab, TabPanel} from "react-tabs";
import {OrderFormClassName} from "./style";
import { TabListClassName, TabSelectedClassName,TabClassName } from "../../views/MarketView/style";
import LongOrderForm from "./LongOrderForm";
import ShortOrderForm from "./ShortOrderForm";
interface OrderFormProps {
  className?: string;
  currentPrice: number;
}

const OrderForm: React.FC<OrderFormProps> = ({className, currentPrice}) => {
  return <div className={`${OrderFormClassName} ${className}`}>

    <Tabs defaultIndex={0}>

      <TabList className={`${TabListClassName} flex flex-row`}>
        <Tab className={`${TabClassName} flex-1`} selectedClassName={TabSelectedClassName}>LONG</Tab>
        <Tab className={`${TabClassName} flex-1`} selectedClassName={TabSelectedClassName}>SHORT</Tab>
      </TabList>

      <TabPanel>
        <LongOrderForm currentPrice={currentPrice} />
      </TabPanel>
      <TabPanel>
        <ShortOrderForm currentPrice={currentPrice} />
      </TabPanel>
    </Tabs>
  </div>;
};

export default OrderForm;
