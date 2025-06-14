import { Input } from "@heroui/react";
import { MinusIcon, PlusIcon } from "../assets/icons";

export default function InputAmount({ value = 0, onChange }) {
    return (
        <div className="flex items-center mb-4">
            <span
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                onClick={() => {
                    if (value > 0) onChange(value - 1);
                }}
            >
                <MinusIcon />
            </span>
            <Input
                type="number"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                variant="underlined"
            />
            <span
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                onClick={() => onChange(value + 1)}
            >
                <PlusIcon />
            </span>
        </div>
    );
}
