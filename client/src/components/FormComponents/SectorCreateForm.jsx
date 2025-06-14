import React from "react";
import Carousel from "../CarouselComponents/Carousel";
import {
    Button,
    DatePicker,
    Input,
    Select,
    SelectItem,
    Textarea,
} from "@heroui/react";
import { Controller, useForm } from "react-hook-form";

const InputField = ({ children }) => {
    return <fieldset className="flex items-center gap-3">{children}</fieldset>;
};

function firstStep({
    register,
    control,
    handleSubmit,
    currentSlide,
    setSectorData,
}) {
    const onSubmit = (data) => {
        data.fecha =
            data.fecha.day.toString() +
            "-" +
            data.fecha.month.toString() +
            "-" +
            data.fecha.year.toString();
        console.log("Form submitted in step 1 with data:", data);
        // Handle form submission logic here
        setSectorData(data);
    };

    const onError = (errors) => {
        console.error("Form submission errors:", errors);
        // Handle form validation errors here
    };

    return (
        <form
            className="flex flex-col gap-4 p-8 justify-between"
            onSubmit={handleSubmit(onSubmit, onError)}
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
                    {...register("aclaraciones")}
                    isDisabled={currentSlide !== 0}
                />
            </div>

            <Button
                type="submit"
                color="primary"
                className="self-end"
                isDisabled={currentSlide !== 0}
            >
                Crear Sector
            </Button>
        </form>
    );
}

function secondStep({
    register,
    control,
    handleSubmit,
    currentSlide,
    setSectorData,
}) {
    const onSubmit = (data) => {
        console.log("Form submitted in step 2 with data:", data);
        // Handle form submission logic here
        setSectorData((prevData) => ({ ...prevData, ...data }));
    };

    return (
        <form
            className="flex flex-col gap-4 p-8 justify-between"
            onSubmit={handleSubmit(onSubmit)}
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
                        {...register("ventilacion", {})}
                        isRequired
                        isDisabled={currentSlide !== 1}
                    >
                        <SelectItem value="natural">Natural</SelectItem>
                        <SelectItem value="mecanica">Mecánica</SelectItem>
                    </Select>
                </InputField>
            </div>

            <Button
                type="submit"
                color="primary"
                className="place-self-end"
                isDisabled={currentSlide !== 1}
            >
                Crear Sector
            </Button>
        </form>
    );
}

function thirdStep({ currentSlide, setSectorData }) {
    const onSubmit = (data) => {
        console.log("Form submitted in step 3 with data:", data);
        // Handle form submission logic here
        setSectorData((prevData) => ({ ...prevData, ...data }));
    };

    return <div className="flex flex-col gap-4 p-8">Objetos</div>;
}

function fourthStep({ currentSlide, setSectorData }) {
    const onSubmit = (data) => {
        console.log("Form submitted in step 4 with data:", data);
        // Handle form submission logic here
        setSectorData((prevData) => ({ ...prevData, ...data }));
    };

    return <div className="flex flex-col gap-4 p-8">Confirmar</div>;
}

export default function SectorCreateForm() {
    const [currentSlide, setCurrentSlide] = React.useState(0);
    const [sectorData, setSectorData] = React.useState({});

    const { register, control, handleSubmit } = useForm();

    const OPTIONS = { watchDrag: false, containScroll: false };
    const SLIDES = React.Children.toArray([
        firstStep({
            register,
            control,
            handleSubmit,
            currentSlide,
            setSectorData,
        }),
        secondStep({
            register,
            control,
            handleSubmit,
            currentSlide,
            setSectorData,
        }),
        thirdStep({
            currentSlide,
            setSectorData,
        }),
        fourthStep({
            currentSlide,
            setSectorData,
        }),
    ]);

    return (
        <div className="p-4">
            <h2 className="text-3xl font-bold mb-4">Crear Sector</h2>
            <Carousel
                slides={SLIDES}
                options={OPTIONS}
                slideController={setCurrentSlide}
            />
        </div>
    );
}
