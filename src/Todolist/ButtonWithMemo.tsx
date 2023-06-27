import React, {memo} from "react";
import Button from "@mui/material/Button";

export type ButtonWithMemoPropsType = {
    title: string,
    onClick: () => void,
    variant: "contained" | "outlined",

}

export const ButtonWithMemo = memo((props: ButtonWithMemoPropsType) => {
    return (
        <Button variant={props.variant} size={"small"}
                onClick={
                    props.onClick
                }>{props.title}
        </Button>)
})