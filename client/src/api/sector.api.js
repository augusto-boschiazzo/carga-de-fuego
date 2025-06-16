import { api } from "./main";

const getAllSectors = async () => {
    try {
        const response = await api.get("/sectores/");
        return response.data;
    } catch (error) {
        console.error("Error fetching sectors:", error);
        throw error;
    }
};

const createSector = async (sector) => {
    try {
        const response = await api.post("/sectores/", sector);
        return response.data;
    } catch (error) {
        console.error("Error creating sector:", error);
        throw error;
    }
};

export const sectorApi = {
    getAllSectors,
    createSector,
};
