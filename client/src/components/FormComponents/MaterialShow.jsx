export default function MaterialShow({ itemInfo }) {
    return (
        <div className="flex flex-col p-4 gap-4">
            <section className="flex gap-2">
                <p className="font-bold">Nombre: </p>
                <p>{itemInfo.nombre}</p>
            </section>
            <section className="flex gap-2">
                <p className="font-bold">Poder calorífico: </p>
                <p>{itemInfo.poder_calorifico}</p>
            </section>
        </div>
    );
}
