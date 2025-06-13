import { Button } from "@heroui/react";
import { useNavigate } from "react-router";

export default function SidebarLink({ to, setSelected, selected, children }) {
    const navigate = useNavigate();

    return (
        <Button
            variant={selected ? "flat" : "light"}
            onPress={() => (setSelected(to.split("/")[1]), navigate(to))}
            radius="full"
            className={selected ? "text-primary w-full" : "w-full"}
        >
            {children}
        </Button>
    );
}
