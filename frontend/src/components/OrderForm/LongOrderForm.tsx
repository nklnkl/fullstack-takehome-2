import React, {useEffect, useState} from "react";
import { useForm } from "react-hook-form";
import { PiCaretDownLight } from "react-icons/pi";
import {ConfettiExplosionColors, FormSlider, LongOrderFormClassName} from "./style";
import ChartDropdown from "../ChartDropdown/ChartDropdown";
import {calculateLiquidationFee, calculateOrderFee, LeverageOptions, onSubmitSuccess, OrderTypeOptions} from "./util";
import {OrderFormValues, resolver, defaultValues} from "./util";
import ConfettiExplosion from "react-confetti-explosion";

interface LongOrderFormProps {
  className?: string;
  currentPrice: number;
  currency: string;
}

const LongOrderForm: React.FC<LongOrderFormProps> = ({
  className,
  currentPrice,
  currency
}) => {
  const [orderType, setOrderType] = useState<string>("market");
  const [leverage, setLeverage] = useState<number>(2);
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    watch
  } = useForm<OrderFormValues>({ resolver, defaultValues });

  const onSubmit = handleSubmit(
    (data) => onSubmitSuccess(data, setShowSuccess)
  );

  return <form className={`${LongOrderFormClassName} ${className}`} onSubmit={onSubmit}>

    <div className="flex flex-row justify-between gap-2">
      <div className="flex-1 flex flex-col items-start gap-2">
        <label className="text-vest-highlight-text">Order Type</label>
        <ChartDropdown className="w-full" options={OrderTypeOptions} onChange={setOrderType} placeholder="MARKET"/>
      </div>
      <div className="flex flex-col items-end gap-2">
        <label>Open Price</label>
        <span className="text-vest-highlight-text pt-2">{currentPrice} PERP</span>
      </div>
    </div>

    <div className="flex flex-row">
      <div className="flex-1 flex flex-col gap-1 items-start">
        <label>Size</label>
        <div className="w-full flex flex-row justify-between bg-vest-border px-2 py-4 rounded">
          <input {...register("size")} className="w-10/12 bg-transparent outline-none border-none" type="number"/>
          <span>{currency}</span>
        </div>
        <span>Up To 1,400 {currency}</span>
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
        <label className="text-left">Liquidation Fee</label>
        <span className="text-vest-highlight-text truncate hyphens-auto">{calculateLiquidationFee(watch("size"), currentPrice)} {currency}</span>
      </div>

      <div className="flex flex-row justify-between">
        <label>Slippage</label>
        <span className="text-vest-highlight-text">1%</span>
      </div>

      <div className="flex flex-row justify-between">
        <label>Fee</label>
        <span className="text-vest-highlight-text">{calculateOrderFee(watch("size"), currentPrice)} {currency}</span>
      </div>
    </div>

    <div className="flex flex-row justify-between">
      <label>Advanced</label>
      <PiCaretDownLight className="text-white" onClick={() => setShowAdvanced(!showAdvanced)}/>
    </div>

    {showAdvanced && (
      <div className="flex flex-col gap-1">
        <div className="flex flex-row justify-between">
          <label>Advanced</label>
          <PiCaretDownLight className="text-white" onClick={() => setShowAdvanced(!showAdvanced)}/>
        </div>
      </div>
    )}

    <button type="submit" className="bg-vest-green text-vest-background py-3 rounded">
      {showSuccess ? `You've earned ${getValues("size")} ${currency}` : `BUY / LONG`}
    </button>

    {
      showSuccess &&
      <div className="flex flex-row justify-center">
        <ConfettiExplosion
          colors={ConfettiExplosionColors}
          force={0.9}
          duration={3000}
          particleCount={500}
          zIndex={1000}
          onComplete={() => setShowSuccess(false)}
        />
      </div>
    }
  </form>;
};

export default LongOrderForm;
