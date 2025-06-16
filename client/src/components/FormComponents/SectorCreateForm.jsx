import React, { use } from "react";
import Carousel from "../CarouselComponents/Carousel";
import {
    Button,
    DatePicker,
    Input,
    Select,
    SelectItem,
    Textarea,
} from "@heroui/react";
import { Controller, set, useForm } from "react-hook-form";
import ObjectList from "../ObjectList";
import { objetosApi } from "../../api/objetos.api";
import { sectorApi } from "../../api/sector.api";

const InputField = ({ children }) => {
    return <fieldset className="flex items-center gap-3">{children}</fieldset>;
};

function firstStep({
    register,
    control,
    handleSubmit,
    currentSlide,
    setCurrentSlide,
    setSectorData,
    pageControl,
}) {
    const onSubmit = (data) => {
        console.log("Form submitted in step 1 with data:", data);
        // Handle form submission logic here
        setSectorData(data);
        setCurrentSlide(currentSlide + 1);
        pageControl.scrollNext();
    };

    const onError = (errors) => {
        console.error("Form submission errors:", errors);
        // Handle form validation errors here
    };

    return (
        <div className="flex flex-col gap-4 p-8 ">
            <form
                className="flex flex-col gap-4 p-8 justify-between"
                onSubmit={handleSubmit(onSubmit, onError)}
                id="sector-step-1"
            >
                <div className="flex flex-col gap-4">
                    <InputField>
                        <Input
                            type="text"
                            label="Nombre del sector"
                            {...register("nombre", { required: true })}
                            isRequired
                            isDisabled={currentSlide !== 0}
                        />

                        <Input
                            type="text"
                            label="Empresa"
                            {...register("empresa", { required: true })}
                            isRequired
                            isDisabled={currentSlide !== 0}
                        />
                    </InputField>

                    <InputField>
                        <Controller
                            control={control}
                            name="fecha"
                            render={({ field }) => (
                                <DatePicker
                                    {...field}
                                    label="Fecha"
                                    color="default"
                                    isRequired
                                    isDisabled={currentSlide !== 0}
                                />
                            )}
                        />
                        <Input
                            type="text"
                            label="Actividad"
                            {...register("actividad", { required: true })}
                            isDisabled={currentSlide !== 0}
                            isRequired
                        />
                    </InputField>

                    <Textarea
                        label="Aclaraciones"
                        isDisabled={currentSlide !== 0}
                    />
                </div>
            </form>

            <Button
                type="submit"
                color="primary"
                className="self-end"
                isDisabled={currentSlide !== 0}
                form="sector-step-1"
            >
                Siguiente
            </Button>
        </div>
    );
}

function secondStep({
    register,
    handleSubmit,
    currentSlide,
    setCurrentSlide,
    setSectorData,
    pageControl,
}) {
    const onSubmit = (data) => {
        data.fecha =
            data.fecha.day.toString() +
            "-" +
            data.fecha.month.toString() +
            "-" +
            data.fecha.year.toString();
        data.riesgo_id = 1;
        data.tipo_de_material_id = 1;
        data.material_predominante_id = 1;
        data.usuarios = [1];
        data.ventilacion_id = parseInt(data.ventilacion_id);
        data.largo = parseFloat(data.largo);
        data.ancho = parseFloat(data.ancho);
        console.log("Form submitted in step 2 with data:", data);
        // Handle form submission logic here
        setSectorData((prevData) => ({ ...prevData, ...data }));
        setCurrentSlide(currentSlide + 1);
        pageControl.scrollNext();
    };

    return (
        <div className="flex flex-col gap-4 p-8">
            <form
                className="flex flex-col gap-4 p-8 justify-between"
                onSubmit={handleSubmit(onSubmit)}
                id="sector-step-2"
            >
                <div className="flex flex-col gap-4">
                    <InputField>
                        <Input
                            type="text"
                            label="Ancho"
                            {...register("ancho", {})}
                            isRequired
                            isDisabled={currentSlide !== 1}
                        />

                        <Input
                            type="text"
                            label="Largo"
                            {...register("largo", {})}
                            isRequired
                            isDisabled={currentSlide !== 1}
                        />
                    </InputField>

                    <InputField>
                        <Select
                            label="Tipo de ventilación"
                            {...register("ventilacion_id", {
                                valueAsNumber: true,
                            })}
                            isRequired
                            isDisabled={currentSlide !== 1}
                        >
                            <SelectItem key={1}>Natural</SelectItem>
                            <SelectItem key={2}>Mecánica</SelectItem>
                        </Select>
                    </InputField>
                </div>
            </form>

            <div className="flex gap-4 p-8">
                <Button
                    onPress={() => {
                        setCurrentSlide(currentSlide - 1);
                        pageControl.scrollPrev();
                    }}
                    color="default"
                    className="self-end"
                    isDisabled={currentSlide === 0}
                >
                    Volver
                </Button>
                <Button
                    type="submit"
                    color="primary"
                    className="place-self-end"
                    isDisabled={currentSlide !== 1}
                    form="sector-step-2"
                >
                    Siguiente
                </Button>
            </div>
        </div>
    );
}

function thirdStep({
    currentSlide,
    setSectorData,
    objetosList,
    selectedObjetos,
    setSelectedObjetos,
    setCurrentSlide,
    pageControl,
}) {
    const onSubmit = () => {
        console.log("Form submitted in step 3 with data:");
        // Handle form submission logic here
        setSectorData((prevData) => ({
            ...prevData,
            objetos: selectedObjetos,
        }));
        setCurrentSlide(currentSlide + 1);
        pageControl.scrollNext();
    };

    return (
        <div className="flex flex-col gap-4 p-8">
            <h3 className="text-xl font-semibold mb-4">Objetos</h3>
            <ObjectList
                objetos={objetosList}
                selectedObjects={selectedObjetos}
                setSelectedObjects={setSelectedObjetos}
            />
            <div className="flex gap-4 p-8">
                <Button
                    onPress={() => {
                        setCurrentSlide(currentSlide - 1);
                        pageControl.scrollPrev();
                    }}
                    color="default"
                    className="self-end"
                    isDisabled={currentSlide !== 2}
                >
                    Volver
                </Button>
                <Button
                    onPress={onSubmit}
                    color="primary"
                    className="place-self-end"
                    isDisabled={currentSlide !== 2}
                >
                    Siguiente
                </Button>
            </div>
        </div>
    );
}

function fourthStep({
    currentSlide,
    sectorData,
    pageControl,
    setCurrentSlide,
}) {
    return (
        <div
            className="flex flex-col gap-4 p-8"
            onClick={() => sectorApi.createSector(sectorData)}
        >
            Confirmar
            <Button
                onPress={() => {
                    setCurrentSlide(currentSlide + 1);
                    pageControl?.scrollPrev();
                }}
                isDisabled={currentSlide !== 3}
            >
                Volver
            </Button>
        </div>
    );
}

export default function SectorCreateForm() {
    const [currentSlide, setCurrentSlide] = React.useState(0);
    const [sectorData, setSectorData] = React.useState({});
    const [objetosList, setObjetosList] = React.useState([]);
    const [selectedObjetos, setSelectedObjetos] = React.useState([]);
    const [pageControl, setPageControl] = React.useState();

    React.useEffect(() => {
        objetosApi
            .getAllObjetos()
            .then((response) => {
                setObjetosList(response);
            })
            .catch((error) => {
                console.error("Error fetching objetos:", error);
            });
    }, []);

    const { register, control, handleSubmit } = useForm();

    const OPTIONS = { watchDrag: false, containScroll: false };
    const SLIDES = React.Children.toArray([
        firstStep({
            register,
            control,
            handleSubmit,
            currentSlide,
            setCurrentSlide,
            setSectorData,
            pageControl,
        }),
        secondStep({
            register,
            control,
            handleSubmit,
            currentSlide,
            setCurrentSlide,
            setSectorData,
            pageControl,
        }),
        thirdStep({
            currentSlide,
            setSectorData,
            objetosList,
            selectedObjetos,
            setSelectedObjetos,
            setCurrentSlide,
            pageControl,
        }),
        fourthStep({
            currentSlide,
            sectorData,
            pageControl,
            setCurrentSlide,
        }),
    ]);

    return (
        <div className="p-4">
            <h2
                className="text-3xl font-bold mb-4"
                onClick={() => console.log(sectorData)}
            >
                Crear sector
            </h2>
            <Carousel
                slides={SLIDES}
                options={OPTIONS}
                slideController={setCurrentSlide}
                setPageControl={setPageControl}
            />
        </div>
    );
}
