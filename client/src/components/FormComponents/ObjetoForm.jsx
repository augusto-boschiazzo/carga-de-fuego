import {
    Input,
    Button,
    addToast,
    Select,
    SelectItem,
    Autocomplete,
    AutocompleteItem,
} from "@heroui/react";
import { useForm } from "react-hook-form";
import { objetosApi } from "../../api/objetos.api";
import { materialesApi } from "../../api/materiales.api";
import React from "react";

export default function ObjetoForm({ itemInfo, updateItemList, onClose }) {
    const { register, handleSubmit, reset, getValues } = useForm();
    const [selectedMaterial, setSelectedMaterial] = React.useState(
        itemInfo?.material?.id || null
    );

    const [materiales, setMateriales] = React.useState([]);

    React.useEffect(() => {
        materialesApi
            .getAllMateriales()
            .then((response) => {
                setMateriales(response);
            })
            .catch((error) => {
                console.error("Error fetching materiales:", error);
            });
    }, []);

    const onSubmit = (data) => {
        data.material_id = selectedMaterial;
        itemInfo
            ? objetosApi
                  .updateObjeto(data, itemInfo.id)
                  .then(() => {
                      addToast({
                          title: "Objeto actualizado",
                          description:
                              "El objeto ha sido actualizado correctamente",
                          color: "success",
                      });
                      updateItemList();
                  })
                  .catch((error) => {
                      addToast({
                          title: "Error",
                          description:
                              "No se ha podido actualizar el objeto. " + error,
                          color: "danger",
                      });
                  })
            : objetosApi
                  .createObjeto(data)
                  .then(() => {
                      addToast({
                          title: "Objeto creado",
                          description: "El objeto ha sido creado correctamente",
                          color: "success",
                      });
                      updateItemList();
                      onClose();
                  })
                  .catch((error) => {
                      addToast({
                          title: "Error",
                          description:
                              "No se ha podido crear el objeto. " + error,
                          color: "danger",
                      });
                      console.error("Error creating objeto:", error.response);
                  });
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
                <h2
                    className="text-3xl font-bold text-center"
                    onClick={() => console.log(materiales)}
                >
                    {itemInfo ? "Modificar objeto" : "Registrar objeto"}
                </h2>
            </div>

            <Input
                type="text"
                label="Nombre"
                defaultValue={itemInfo?.nombre}
                {...register("nombre", { required: true })}
                isRequired
            />

            <Autocomplete
                label="Material"
                defaultSelectedKey={itemInfo?.material.id.toString()}
                isRequired
                onSelectionChange={(selected) => {
                    setSelectedMaterial(selected);
                }}
            >
                {materiales.map((material) => (
                    <AutocompleteItem key={material.id}>
                        {material.nombre + " - " + material.poder_calorifico}
                    </AutocompleteItem>
                ))}
            </Autocomplete>

            <Button type="submit" color="primary" className="text-white">
                Confirmar
            </Button>
        </form>
    );
}
