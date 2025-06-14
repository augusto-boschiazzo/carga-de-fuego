import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HeroUIProvider, ToastProvider } from "@heroui/react";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import { DashboardLayout } from "./components/DashboardLayout";
import { DashboardPage } from "./pages/HomePage";
import MaterialesPage from "./pages/MaterialesPage";
import ObjetosPage from "./pages/ObjetosPage";
import { AuthProvider } from "./contexts/AuthContext";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import SectoresPage from "./pages/SectoresPage";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <HeroUIProvider className="dark">
            <AuthProvider>
                <ToastProvider />
                <BrowserRouter>
                    <Routes>
                        <Route element={<DashboardLayout />}>
                            <Route path="/" element={<DashboardPage />} />
                            <Route
                                path="/materiales"
                                element={<MaterialesPage />}
                            />
                            <Route path="/objetos" element={<ObjetosPage />} />
                            <Route
                                path="/sectores"
                                element={<SectoresPage />}
                            />
                        </Route>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </HeroUIProvider>
    </StrictMode>
);
