import { api } from "./main";

const getAllMateriales = async () => {
    const response = await api.get("/materiales/");
    return response.data;
};

const createMaterial = async (data) => {
    const response = await api.post("/materiales/", data);
    return response.data;
};

const updateMaterial = async (data, id) => {
    const response = await api.put(`/materiales/${id}/`, data);
    return response.data;
};

const deleteMaterial = async (id) => {
    const response = await api.delete(`/materiales/${id}/`);
    return response.data;
};

export const materialesApi = {
    getAllMateriales,
    createMaterial,
    updateMaterial,
    deleteMaterial,
};
