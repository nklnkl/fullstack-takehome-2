import { Slider } from "@mui/material";
import styled from "@mui/material/styles/styled";

export const ConfettiExplosionColors = ["#4BC2A3"];

export const OrderFormClassName = "flex flex-col py-1 px-4 bg-vest-secondary-background text-sm text-vest-normal-text";
export const LongOrderFormClassName = "flex flex-col gap-3 py-2";

export const FormSlider = styled(Slider)({
    color: "#AEADAD",
    "& .MuiSlider-thumb": {
        boxShadow: "0px 0px 0px 8px rgba(0, 0, 0, 0)",
        "&:focus, &:hover, &.Mui-active": {
            boxShadow: "0px 0px 0px 8px rgba(0, 0, 0, 0)",
        },
    },
    "& .MuiSlider-mark": {
        color: "#AEADAD",
        height: "13px",
    },
    "& .MuiSlider-markLabel": {
        color: "#AEADAD",
        fontSize: "12px",
    },
    "& .MuiSlider-rail": {
        opacity: 0.1,
    },
});
