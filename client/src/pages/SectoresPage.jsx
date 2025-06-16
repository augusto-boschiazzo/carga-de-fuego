import React from "react";
import SectorCreateForm from "../components/FormComponents/SectorCreateForm";
import ListItems from "../components/ListPageComponents/ListItems";
import { sectorApi } from "../api/sector.api";

const columns = [
    { name: "ID", uid: "id", sortable: true },
    { name: "NOMBRE", uid: "nombre", sortable: true },
    { name: "EMPRESA", uid: "empresa", sortable: true },
    { name: "FECHA", uid: "fecha", sortable: true },
    {
        name: "MATERIAL PREDOMINANATE",
        uid: "material_predominante",
        sortable: true,
    },
    { name: "ACCIONES", uid: "actions" },
];

const INITIAL_VISIBLE_COLUMNS = ["nombre", "empresa", "fecha", "actions"];

export default function SectoresPage() {
    const [sectores, setSectores] = React.useState([]);
    const [loading, setLoading] = React.useState("loading");

    React.useEffect(() => {
        sectorApi
            .getAllSectors()
            .then((data) => {
                setSectores(data);
                setLoading("idle");
            })
            .catch((error) => {
                console.error("Error fetching sectors:", error);
                setLoading("idle");
            });
    }, []);

    return (
        <section className="w-full py-[135px] h-full bg-[#17191C] flex flex-col items-center justify-center gap-10 text-[#DBDDE1]">
            <h2 className="text-3xl font-bold text-center">Sectores</h2>
            <ListItems
                registerForm={<SectorCreateForm />}
                infoShow={<></>}
                loadingState={loading}
                handleDelete={() => {}}
                columns={columns}
                INITIAL_VISIBLE_COLUMNS={INITIAL_VISIBLE_COLUMNS}
                fetchInfo={() => {}}
                itemList={sectores}
                itemName={"sector"}
            />
        </section>
    );
}
