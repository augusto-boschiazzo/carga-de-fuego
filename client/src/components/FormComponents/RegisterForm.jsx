import { Input, Button, addToast, Checkbox } from "@heroui/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { InputPassword } from "../InputPassword";
import { authService } from "../../api/auth.service";
import { format } from "date-fns";
import { useNavigate } from "react-router";

const InputField = ({ children }) => {
    return <fieldset className="flex items-center gap-3">{children}</fieldset>;
};

export default function RegisterForm() {
    var navigate = useNavigate();

    const { register, handleSubmit, reset } = useForm();

    const onSubmit = (data) => {
        let userData = data;

        authService
            .register(userData)
            .then(() => {
                addToast({
                    title: "Cuenta creada con éxito",
                    description: "Ahora puedes iniciar sesión.",
                    variant: "flat",
                    color: "success",
                });
                reset();
                navigate("/login");
            })
            .catch((err) => {
                addToast({
                    title: "Error al crear la cuenta",
                    variant: "flat",
                    color: "danger",
                });
                console.error(err);
            });
    };

    const onError = (errors) => {
        console.error(errors);
    };

    useEffect(() => {
        reset();
    }, [reset]);

    return (
        <form
            className="w-[50%] flex flex-col gap-4 p-8 bg-[#22252A] text-[#E4E4E7] rounded-lg shadow-lg"
            onSubmit={handleSubmit(onSubmit, onError)}
        >
            <h1 className="text-3xl font-bold text-center">Crear cuenta</h1>

            <InputField>
                <Input
                    type="text"
                    label="Nombre"
                    {...register("nombre", { required: true })}
                    isRequired
                />
                <Input
                    type="text"
                    label="Apellido"
                    {...register("apellido", { required: true })}
                    isRequired
                />
            </InputField>

            <Input
                type="email"
                label="Correo electrónico"
                {...register("email", { required: true })}
                isRequired
            />

            <InputPassword
                label="Contraseña"
                register={{
                    ...register("password", {
                        required: true,
                    }),
                }}
            />

            <Checkbox {...register("admin")}>Admin</Checkbox>

            <Button type="submit" color="primary" className="text-white">
                Confirmar
            </Button>
        </form>
    );
}
