import LoginForm from "../components/FormComponents/LoginForm";
import { Link } from "react-router";
import { useAuth } from "../contexts/AuthContext";

export default function LoginPage() {
    const { isAuthenticated } = useAuth();

    return (
        <section className="flex flex-col items-center gap-5 bg-[#17191C] justify-center min-h-screen dark">
            {isAuthenticated && (
                <p>
                    Ya tienes una sesión iniciada! <br />
                    Para entrar con otra cuenta primero debes cerrar tu sesión.
                </p>
            )}
            {!isAuthenticated && (
                <>
                    <LoginForm />
                    <p className="text-center text-gray-600">
                        No tienes una cuenta?{" "}
                        <Link
                            to="/register"
                            className="text-blue-600 hover:underline"
                        >
                            Crea una cuenta
                        </Link>
                    </p>
                </>
            )}
        </section>
    );
}
