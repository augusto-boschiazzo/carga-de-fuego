import { api } from "./main";

const getAllObjetos = async () => {
    const response = await api.get("/objetos/");
    return response.data;
};

const createObjeto = async (data) => {
    const response = await api.post("/objetos/", data);
    return response.data;
};

const updateObjeto = async (data, id) => {
    const response = await api.put(`/objetos/${id}/`, data);
    return response.data;
};

const deleteObjeto = async (id) => {
    const response = await api.delete(`/objetos/${id}/`);
    return response.data;
};

export const objetosApi = {
    getAllObjetos,
    createObjeto,
    updateObjeto,
    deleteObjeto,
};
