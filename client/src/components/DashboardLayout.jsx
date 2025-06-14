import { Menu } from "react-pro-sidebar";
import { Link, Outlet, useNavigate } from "react-router";

import { Topbar } from "./Topbar";
import {
    Accordion,
    AccordionItem,
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
} from "@heroui/react";
import SidebarLink from "./SidebarLink";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export function DashboardLayout() {
    const [selected, setSelected] = useState();

    const { isAuthenticated, user, logout } = useAuth();

    const navigate = useNavigate();

    if (!isAuthenticated) {
        navigate("/login");
    }

    if (isAuthenticated) {
        return (
            <div className="flex h-[100vh]">
                <aside
                    className="w-[5rem] border-r border-gray-600 items-center flex flex-col py-7"
                    style={{ backgroundColor: "#22252A" }}
                >
                    <Dropdown
                        placement="bottom-end"
                        className="dark text-white"
                    >
                        <DropdownTrigger>
                            <Button isIconOnly variant="light" radius="full">
                                <img src="/icons/gear.svg" alt="Config Icon" />
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            aria-label="Profile Actions"
                            variant="flat"
                        >
                            <DropdownItem key="profile" className="h-14 gap-2">
                                <p className="font-semibold">Sesión de:</p>
                                <p className="font-semibold">{user.email}</p>
                            </DropdownItem>
                            <DropdownItem key="settings">
                                <Link to="/mi-perfil">Ver perfil</Link>
                            </DropdownItem>
                            <DropdownItem
                                key="logout"
                                color="danger"
                                onClick={logout}
                            >
                                Cerrar sesión
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </aside>
                <aside
                    className="p-4 w-[18%] border-r border-gray-600"
                    style={{ backgroundColor: "#22252A" }}
                >
                    <div className="flex flex-col">
                        <Link
                            to="/"
                            className="flex items-center "
                            onClick={() => setSelected("")}
                        >
                            <img
                                src="/logo.svg"
                                alt="Carga de fuego Logo"
                                width="60"
                                height="60"
                            />

                            <span className="text-white text-2xl font-bold">
                                Carga de Fuego
                            </span>
                        </Link>
                        <Menu>
                            <Accordion variant="light" selectionMode="multiple">
                                <AccordionItem
                                    key="1"
                                    aria-label="Vehículos"
                                    title="Base de Datos"
                                    startContent={
                                        <img
                                            src="/icons/database.svg"
                                            alt="Database Icon"
                                            width="20"
                                            height="20"
                                        />
                                    }
                                >
                                    <div className="flex flex-col px-4">
                                        <SidebarLink
                                            to="/materiales"
                                            setSelected={setSelected}
                                            selected={selected === "materiales"}
                                        >
                                            Materiales
                                        </SidebarLink>
                                        <SidebarLink
                                            to="/objetos"
                                            setSelected={setSelected}
                                            selected={selected === "objetos"}
                                        >
                                            Objetos
                                        </SidebarLink>
                                        <SidebarLink
                                            to="/sectores"
                                            setSelected={setSelected}
                                            selected={selected === "sectores"}
                                        >
                                            Sectores
                                        </SidebarLink>
                                    </div>
                                </AccordionItem>
                                <AccordionItem
                                    key="2"
                                    aria-label="Usuarios"
                                    title="Usuarios"
                                    startContent={
                                        <img
                                            src="/icons/user.svg"
                                            alt="Users Icon"
                                            width="20"
                                            height="20"
                                        />
                                    }
                                >
                                    <div className="flex flex-col px-4">
                                        <SidebarLink
                                            to="/usuarios"
                                            setSelected={setSelected}
                                            selected={selected === "usuarios"}
                                        >
                                            Usuarios
                                        </SidebarLink>
                                    </div>
                                </AccordionItem>
                            </Accordion>
                            <div className="flex flex-col items-center "></div>
                        </Menu>
                    </div>
                </aside>
                <div className="flex flex-col w-full ">
                    <Topbar setSelected={setSelected} />
                    <Outlet />
                </div>
            </div>
        );
    }
}
