import React from "react";
import ListItems from "../components/ListPageComponents/ListItems";
import { materialesApi } from "../api/materiales.api";
import MaterialForm from "../components/FormComponents/MaterialForm";
import MaterialShow from "../components/FormComponents/MaterialShow";

export default function MaterialesPage() {
    const columns = [
        { name: "ID", uid: "id", sortable: true },
        { name: "NOMBRE", uid: "nombre", sortable: true },
        { name: "PODER CALORÍFICO", uid: "poder_calorifico", sortable: true },
        { name: "ACCIONES", uid: "actions" },
    ];

    const INITIAL_VISIBLE_COLUMNS = ["nombre", "poder_calorifico", "actions"];

    const [itemList, setItemList] = React.useState([]);

    function fetchInfo() {
        materialesApi
            .getAllMateriales()
            .then((response) => {
                setItemList(response);
            })
            .catch((error) => {
                console.error("Error fetching materials:", error);
            });
    }

    React.useEffect(() => {
        fetchInfo();
    }, []);

    return (
        <section className="w-full py-[135px] h-full bg-[#17191C] flex flex-col items-center justify-center gap-10 text-[#DBDDE1]">
            <h2 className="text-3xl font-bold text-center">
                Lista de materiales
            </h2>
            <ListItems
                registerForm={<MaterialForm />}
                infoShow={<MaterialShow />}
                handleDelete={materialesApi.deleteMaterial}
                columns={columns}
                INITIAL_VISIBLE_COLUMNS={INITIAL_VISIBLE_COLUMNS}
                fetchInfo={fetchInfo}
                itemList={itemList}
                itemName={"material"}
            />
        </section>
    );
}
