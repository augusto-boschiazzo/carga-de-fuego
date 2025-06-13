import RegisterForm from "../components/FormComponents/RegisterForm";
import { Link } from "react-router";
import { useAuth } from "../contexts/AuthContext";

export default function RegisterPage() {
    const { isAuthenticated } = useAuth();

    return (
        <section className="w-full min-h-screen flex flex-col bg-[#17191C] items-center justify-center gap-5 pt-32 pb-20">
            {isAuthenticated && (
                <p>
                    Ups, parece que ya tienes una cuenta. <br />
                    Para entrar con otra cuenta primero debes cerrar tu sesión.
                </p>
            )}
            {!isAuthenticated && (
                <>
                    <RegisterForm />
                    <p className="text-center text-gray-600">
                        Ya tienes una cuenta?
                        <Link
                            to="/login"
                            className="text-blue-600 hover:underline"
                        >
                            Inicia sesión
                        </Link>
                    </p>
                </>
            )}
        </section>
    );
}
