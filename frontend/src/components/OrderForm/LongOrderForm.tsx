import React, {useState} from "react";
import {FormSlider, LongOrderFormClassName} from "./style";
import ChartDropdown from "../ChartDropdown/ChartDropdown";
import {LeverageOptions, OrderTypeOptions} from "./util";

interface LongOrderFormProps {
  className?: string;
}

const LongOrderForm: React.FC<LongOrderFormProps> = ({className}) => {
  const [orderType, setOrderType] = useState<string>("market");
  const [leverage, setLeverage] = useState<number>(2);

  return <div className={`${LongOrderFormClassName} ${className}`}>

    <div className="flex flex-row justify-between gap-2">
      <div className="flex-1 flex flex-col items-start gap-2">
        <label className="text-vest-highlight-text">Order Type</label>
        <ChartDropdown className="w-full" options={OrderTypeOptions} onChange={setOrderType} placeholder="MARKET"/>
      </div>
      <div className="flex flex-col items-end gap-2">
        <label>Open Price</label>
        <span className="text-vest-highlight-text pt-2">100.23 USDC</span>
      </div>
    </div>

    <div className="flex flex-row">
      <div className="flex-1 flex flex-col gap-1 items-start">
        <label>Size</label>
        <div className="w-full flex flex-row justify-between bg-vest-border px-2 py-4 rounded">
          <input placeholder="0." className="w-10/12 bg-transparent outline-none border-none" type="number"/>
          <span>USDC</span>
        </div>
        <span>Up To 1,400 USDC</span>
      </div>
    </div>

    <div className="flex flex-row justify-between">
      <span className="">Leverage</span>
      <span className="text-vest-highlight-text font-bold">{LeverageOptions[leverage].label}</span>
    </div>

    <FormSlider
      defaultValue={0}
      onChange={(event, newValue) => setLeverage(newValue as number)}
      valueLabelDisplay="auto"
      step={null}
      max={6}
      marks={LeverageOptions}
    />

    <div className="flex flex-col gap-1">
      <div className="flex flex-row justify-between">
        <label>Liquidation Fee</label>
        <span className="text-vest-highlight-text">90.20 USDC</span>
      </div>

      <div className="flex flex-row justify-between">
        <label>Slippage</label>
        <span className="text-vest-highlight-text">1%</span>
      </div>

      <div className="flex flex-row justify-between">
        <label>Fee</label>
        <span className="text-vest-highlight-text">0.0001 USDC</span>
      </div>
    </div>

    <div className="flex flex-row justify-between">
      <label>Advanced</label>
      <button>v</button>
    </div>

    <button className="bg-vest-green text-vest-background py-3 rounded">BUY / LONG</button>
  </div>;
};

export default LongOrderForm;
