import React from "react";
import {Tabs, TabList, Tab, TabPanel} from "react-tabs";
import {OrderFormClassName} from "./style";
import { TabListClassName, TabSelectedClassName,TabClassName } from "../../views/MarketView/style";
import LongOrderForm from "./LongOrderForm";

interface OrderFormProps {
  className?: string;
}

const OrderForm: React.FC<OrderFormProps> = ({className}) => {
  return <div className={`${OrderFormClassName} ${className}`}>

    <Tabs defaultIndex={0}>

      <TabList className={`${TabListClassName} flex flex-row`}>
        <Tab className={`${TabClassName} flex-1`} selectedClassName={TabSelectedClassName}>LONG</Tab>
        <Tab className={`${TabClassName} flex-1`} selectedClassName={TabSelectedClassName}>SHORT</Tab>
      </TabList>

      <TabPanel>
        <LongOrderForm />
      </TabPanel>
      <TabPanel>
        SHORT
      </TabPanel>
    </Tabs>
  </div>;
};

export default OrderForm;
