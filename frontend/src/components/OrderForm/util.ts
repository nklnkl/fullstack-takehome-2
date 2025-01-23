import { Resolver } from "react-hook-form";

export const OrderTypeOptions = [
    { value: "market", label: "MARKET" },
    { value: "limit", label: "LIMIT" },
];

export const LeverageOptions = [
    { value: 0, label: "2x" },
    { value: 1, label: "5x" },
    { value: 2, label: "10x" },
    { value: 3, label: "25x" },
    { value: 4, label: "50x" },
    { value: 5, label: "100x" },
    { value: 6, label: "128x" },
];

export type OrderFormValues = {
    orderType: string;
    size: number;
    leverage: number;
};

export const defaultValues: OrderFormValues = {
    orderType: OrderTypeOptions[0].value,
    size: 1,
    leverage: LeverageOptions[0].value,
};

export const resolver: Resolver<OrderFormValues> = async (values) => {
    return {
        values: {
            orderType: values.orderType || OrderTypeOptions[0].value,
            size: values.size || 1,
            leverage: values.leverage || LeverageOptions[0].value,
        },
        errors: {},
    };
};

export const onSubmitSuccess = (data: OrderFormValues, setShowConfetti: (show: boolean) => void) => {
    setShowConfetti(true);
    playSuccessSound();
};

export const calculateLiquidationFee = (size: number, price: number) => {
    return size * price * 0.00001;
}

export const calculateOrderFee = (size: number, price: number) => {
    return size * price * 0.000005;
}

export const playSuccessSound = () => {
    const audio = new Audio("/success.mp3");
    audio.play();
}