import { Input, Button, addToast } from "@heroui/react";
import { useForm } from "react-hook-form";
import { materialesApi } from "../../api/materiales.api";

export default function MaterialForm({ itemInfo, updateItemList, onClose }) {
    const { register, handleSubmit, reset, getValues } = useForm();

    const onSubmit = (data) => {
        itemInfo
            ? materialesApi
                  .updateMaterial(data, itemInfo.id)
                  .then(() => {
                      addToast({
                          title: "Material actualizado",
                          description:
                              "El material ha sido actualizado correctamente",
                          color: "success",
                      });
                      updateItemList();
                  })
                  .catch((error) => {
                      addToast({
                          title: "Error",
                          description:
                              "No se ha podido actualizar el material. " +
                              error,
                          color: "danger",
                      });
                  })
            : (materialesApi
                  .createMaterial(data)
                  .then(() => {
                      addToast({
                          title: "Material creado",
                          description:
                              "El material ha sido creado correctamente",
                          color: "success",
                      });
                      updateItemList();
                      onClose();
                  })
                  .catch((error) => {
                      addToast({
                          title: "Error",
                          description:
                              "No se ha podido crear el material. " + error,
                          color: "danger",
                      });
                  }),
              reset());
    };

    const onError = (errors) => {
        console.error(errors);
    };

    return (
        <form
            className="flex flex-col gap-4 p-8"
            onSubmit={handleSubmit(onSubmit, onError)}
        >
            <div className="text-center mb-4">
                <h2 className="text-3xl font-bold text-center">
                    {itemInfo ? "Modificar material" : "Registrar material"}
                </h2>
            </div>

            <Input
                type="text"
                label="Nombre"
                defaultValue={itemInfo?.nombre}
                {...register("nombre", { required: true })}
                isRequired
            />

            <Input
                type="number"
                label="Poder calorífico"
                defaultValue={itemInfo?.poder_calorifico}
                {...register("poder_calorifico", { required: true })}
                isRequired
            />

            <Button type="submit" color="primary" className="text-white">
                Confirmar
            </Button>
        </form>
    );
}
