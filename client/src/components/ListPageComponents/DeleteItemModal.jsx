import {
    addToast,
    Button,
    Modal,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from "@heroui/react";
import React from "react";

export default function DeleteItemModal({
    isOpen,
    onOpenChange,
    itemInfo,
    updateItemList,
    deleteItem,
    databaseInfo,
    deleteFunction,
    itemName,
}) {
    const newProps = {
        itemInfo: itemInfo,
        updateItemList: updateItemList,
        databaseInfo: databaseInfo,
    };

    const handleDelete = (id, onClose) => {
        deleteFunction(id)
            .then(() => {
                addToast({
                    title:
                        itemName.charAt(0).toUpperCase() +
                        itemName.slice(1) +
                        " eliminado",
                    description:
                        "El " + itemName + " se ha eliminado correctamente.",
                    color: "success",
                });
                updateItemList();
                onClose();
            })
            .catch((error) => {
                addToast({
                    title: "Error al eliminar",
                    description: error.message,
                    color: "danger",
                });
            });
    };

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            size="3xl"
            className="dark text-[#DBDDE1]"
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            {"Está seguro que desea eliminar el siguiente " +
                                itemName +
                                "?"}
                        </ModalHeader>
                        {React.cloneElement(deleteItem, {
                            ...deleteItem.props,
                            ...newProps,
                            onClose: onClose,
                        })}
                        <ModalFooter className="flex justify-end">
                            <Button variant="ghost" onPress={onClose}>
                                Cancelar
                            </Button>
                            <Button
                                color="danger"
                                onPress={() =>
                                    handleDelete(itemInfo.id, onClose)
                                }
                            >
                                Eliminar
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
