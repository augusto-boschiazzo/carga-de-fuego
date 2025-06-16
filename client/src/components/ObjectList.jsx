import React, { use } from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Input,
    Button,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Pagination,
} from "@heroui/react";

import { SearchIcon, PlusIcon, ChevronDownIcon } from "../assets/icons";
import InputAmount from "./InputAmount";

export const columns = [
    { name: "NOMBRE", uid: "nombre", sortable: true },
    { name: "MATERIAL", uid: "material", sortable: true },
    { name: "CANTIDAD", uid: "cantidad" },
];

export default function ObjectList({
    objetos,
    selectedObjects,
    setSelectedObjects,
}) {
    const [filterValue, setFilterValue] = React.useState("");
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [sortDescriptor, setSortDescriptor] = React.useState({
        column: "nombre",
        direction: "ascending",
    });
    const [page, setPage] = React.useState(1);

    React.useEffect(() => {
        console.log("selectedObjects updated: ", selectedObjects);
    }, [selectedObjects]);

    const onChangeAmount = (amount, objeto) => {
        setSelectedObjects((prev) => {
            const exists = prev.find((item) => item.objeto === objeto);
            if (amount > 0) {
                if (exists) {
                    // Update existing
                    return prev.map((item) =>
                        item.objeto === objeto
                            ? { objeto: item.objeto, cantidad: amount }
                            : item
                    );
                } else {
                    // Add new
                    return [...prev, { objeto, cantidad: amount }];
                }
            } else {
                // Remove if amount <= 0
                return prev.filter((item) => item.objeto !== objeto);
            }
        });
    };

    const hasSearchFilter = Boolean(filterValue);

    const filteredItems = React.useMemo(() => {
        let filteredObjetos = [...objetos];

        if (hasSearchFilter) {
            filteredObjetos = filteredObjetos.filter((objeto) =>
                objeto.nombre.toLowerCase().includes(filterValue.toLowerCase())
            );
        }

        return filteredObjetos;
    }, [objetos, filterValue]);

    const pages = Math.ceil(filteredItems.length / rowsPerPage) || 1;

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);

    const sortedItems = React.useMemo(() => {
        return [...items].sort((a, b) => {
            const first = a[sortDescriptor.column];
            const second = b[sortDescriptor.column];
            const cmp = first < second ? -1 : first > second ? 1 : 0;

            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [sortDescriptor, items]);

    const renderCell = React.useCallback((objeto, columnKey) => {
        const cellValue = objeto[columnKey];

        switch (columnKey) {
            case "material":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-small capitalize">
                            {cellValue.nombre}
                        </p>
                        <p className="text-bold text-tiny capitalize text-default-400">
                            {"Poder calorífico: " + cellValue.poder_calorifico}
                        </p>
                    </div>
                );
            case "cantidad":
                return (
                    <div className="relative flex justify-end items-center gap-2">
                        <InputAmount
                            initialValue={
                                selectedObjects.find(
                                    (item) => item.objeto === objeto.id
                                )?.cantidad
                            }
                            objeto={objeto.id}
                            onChange={onChangeAmount}
                        />
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    const onRowsPerPageChange = React.useCallback((e) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
    }, []);

    const onSearchChange = React.useCallback((value) => {
        if (value) {
            setFilterValue(value);
            setPage(1);
        } else {
            setFilterValue("");
        }
    }, []);

    const onClear = React.useCallback(() => {
        setFilterValue("");
        setPage(1);
    }, []);

    const topContent = React.useMemo(() => {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex justify-between gap-3 items-end">
                    <Input
                        isClearable
                        className="w-full sm:max-w-[44%]"
                        placeholder="Search by name..."
                        startContent={<SearchIcon />}
                        value={filterValue}
                        onClear={() => onClear()}
                        onValueChange={onSearchChange}
                    />
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-default-400 text-small">
                        Total {objetos.length} objetos
                    </span>
                    <label className="flex items-center text-default-400 text-small">
                        Rows per page:
                        <select
                            className="bg-transparent outline-none text-default-400 text-small"
                            onChange={onRowsPerPageChange}
                        >
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                        </select>
                    </label>
                </div>
            </div>
        );
    }, [
        filterValue,
        onRowsPerPageChange,
        objetos.length,
        onSearchChange,
        hasSearchFilter,
    ]);

    const bottomContent = React.useMemo(() => {
        return (
            <div className="py-2 px-2 flex justify-between items-center">
                <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="primary"
                    page={page}
                    total={pages}
                    onChange={setPage}
                />
            </div>
        );
    }, [items.length, page, pages, hasSearchFilter]);

    return (
        <Table
            isHeaderSticky
            aria-label="Lista de objetos"
            bottomContent={bottomContent}
            bottomContentPlacement="outside"
            classNames={{
                wrapper: "max-h-[382px]",
            }}
            sortDescriptor={sortDescriptor}
            topContent={topContent}
            topContentPlacement="outside"
            onSortChange={setSortDescriptor}
        >
            <TableHeader columns={columns}>
                {(column) => (
                    <TableColumn
                        key={column.uid}
                        align={column.uid === "actions" ? "center" : "start"}
                        allowsSorting={column.sortable}
                    >
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody
                emptyContent={"No se encontraron objetos"}
                items={sortedItems}
            >
                {(item) => (
                    <TableRow key={item.id}>
                        {(columnKey) => (
                            <TableCell>{renderCell(item, columnKey)}</TableCell>
                        )}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
