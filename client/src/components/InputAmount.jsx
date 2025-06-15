import { Input } from "@heroui/react";
import { MinusIcon, PlusIcon } from "../assets/icons";
import React from "react";

export default function InputAmount({ onChange, objeto, initialValue = 0 }) {
    const [value, setValue] = React.useState(initialValue);

    const changeValue = (newValue) => {
        newValue = parseInt(newValue, 10);
        if (isNaN(newValue) || newValue < 0) {
            newValue = 0;
        }
        onChange(newValue, objeto);
        setValue(newValue);
    };

    return (
        <div className="flex items-center mb-4">
            <span
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                onClick={() => {
                    if (value > 0) changeValue(value - 1);
                }}
            >
                <MinusIcon />
            </span>
            <Input
                type="number"
                value={value}
                onChange={(e) => changeValue(e.target.value)}
                variant="underlined"
            />
            <span
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                onClick={() => changeValue(value + 1)}
            >
                <PlusIcon />
            </span>
        </div>
    );
}
