import React from "react";
import ListItems from "../components/ListPageComponents/ListItems";
import { objetosApi } from "../api/objetos.api";
import ObjetoForm from "../components/FormComponents/ObjetoForm";
import ObjetoShow from "../components/FormComponents/ObjetoShow";

export default function ObjetosPage() {
    const columns = [
        { name: "ID", uid: "id", sortable: true },
        { name: "NOMBRE", uid: "nombre", sortable: true },
        { name: "MATERIAL", uid: "material", sortable: true },
        { name: "ACCIONES", uid: "actions" },
    ];

    const INITIAL_VISIBLE_COLUMNS = ["nombre", "material", "actions"];

    const [itemList, setItemList] = React.useState([]);

    function fetchInfo() {
        objetosApi
            .getAllObjetos()
            .then((response) => {
                setItemList(response);
            })
            .catch((error) => {
                console.error("Error fetching objetos:", error);
            });
    }

    React.useEffect(() => {
        fetchInfo();
    }, []);

    return (
        <section
            className="w-full py-[135px] h-full flex flex-col items-center justify-center gap-10"
            style={{ backgroundColor: "#17191C", color: "#DBDDE1" }}
        >
            <h2 className="text-3xl font-bold text-center">Lista de objetos</h2>
            <ListItems
                registerForm={<ObjetoForm />}
                infoShow={<ObjetoShow />} // Placeholder for info show component
                columns={columns}
                INITIAL_VISIBLE_COLUMNS={INITIAL_VISIBLE_COLUMNS}
                fetchInfo={fetchInfo}
                itemList={itemList}
                itemName={"objeto"}
                handleDelete={objetosApi.deleteObjeto}
            />
        </section>
    );
}
