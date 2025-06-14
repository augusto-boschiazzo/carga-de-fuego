import SectorCreateForm from "../components/FormComponents/SectorCreateForm";
import ListItems from "../components/ListPageComponents/ListItems";

const columns = [
    { name: "ID", uid: "id", sortable: true },
    { name: "NOMBRE", uid: "nombre", sortable: true },
    { name: "ACCIONES", uid: "actions" },
];

const INITIAL_VISIBLE_COLUMNS = ["nombre", "actions"];

export default function SectoresPage() {
    return (
        <section className="w-full py-[135px] h-full bg-[#17191C] flex flex-col items-center justify-center gap-10 text-[#DBDDE1]">
            <h2 className="text-3xl font-bold text-center">Sectores</h2>
            <ListItems
                registerForm={<SectorCreateForm />}
                infoShow={<></>}
                handleDelete={() => {}}
                columns={columns}
                INITIAL_VISIBLE_COLUMNS={INITIAL_VISIBLE_COLUMNS}
                fetchInfo={() => {}}
                itemList={[]}
                itemName={"sector"}
            />
        </section>
    );
}
